import { useState } from "react";
import { User, Mail, Building2, MapPin, Check } from "lucide-react";
import { Input } from "../../../components/ui/Input";

export default function RegisterForm({ onSubmit }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    companyName: "",
    ruc: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  // =========================
  // VALIDACIONES
  // =========================
  const validateStep1 = () => {
    const err = {};

    if (!form.firstName.trim()) err.firstName = "Nombre requerido";
    if (!form.lastName.trim()) err.lastName = "Apellido requerido";

    if (!form.email.trim()) err.email = "Correo requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Correo inválido";

    if (!form.password) err.password = "Contraseña requerida";
    else if (form.password.length < 8)
      err.password = "Mínimo 8 caracteres";

    if (!form.passwordConfirm) {
      err.passwordConfirm = "Confirma tu contraseña";
    } else if (form.password !== form.passwordConfirm) {
      err.passwordConfirm = "Las contraseñas no coinciden";
    }

    return err;
  };

  const validateStep2 = () => {
    const err = {};

    if (!form.companyName.trim())
      err.companyName = "Empresa requerida";

    if (!form.address.trim())
      err.address = "Dirección requerida";

    return err;
  };

  // =========================
  // HANDLERS
  // =========================
  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  const nextStep = () => {
    const err = validateStep1();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setStep(2);
    }
  };

  const prevStep = () => setStep(1);

  // =========================
  // SUBMIT 🔥 CORREGIDO
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateStep2();
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    try {
      setLoading(true);

      const payload = {
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email.trim(),
        password: form.password,
        role: "ADMIN", // 🔥 importante

        company: {
          create: {
            name: form.companyName.trim(),
            ruc: form.ruc || null,
            address: form.address.trim(),
          },
        },
      };

      const res = await onSubmit?.(payload);

      console.log("REGISTER RESPONSE:", res);

      // 🔴 VALIDAR RESPUESTA
      if (!res || !res.success) {
        throw new Error(res?.message || "Error al registrarse");
      }

      // ✅ REDIRECCIÓN
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setErrors({
        submit:
          error?.message ||
          "Error inesperado al registrarse",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6"
    >

      {/* ERROR GLOBAL */}
      {errors.submit && (
        <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm">
          {errors.submit}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre"
              icon={User}
              value={form.firstName}
              onChange={(e) =>
                handleChange("firstName", e.target.value)
              }
              error={errors.firstName}
              touched={touched.firstName}
            />

            <Input
              label="Apellido"
              icon={User}
              value={form.lastName}
              onChange={(e) =>
                handleChange("lastName", e.target.value)
              }
              error={errors.lastName}
              touched={touched.lastName}
            />
          </div>

          <Input
            label="Correo Electrónico"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            error={errors.email}
            touched={touched.email}
          />

          <Input
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) =>
              handleChange("password", e.target.value)
            }
            error={errors.password}
            touched={touched.password}
            showPasswordRequirements
            currentPassword={form.password}
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            value={form.passwordConfirm}
            onChange={(e) =>
              handleChange("passwordConfirm", e.target.value)
            }
            error={errors.passwordConfirm}
            touched={touched.passwordConfirm}
          />

          <button
            type="button"
            onClick={nextStep}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Continuar →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">

          <Input
            label="Nombre de Empresa"
            icon={Building2}
            value={form.companyName}
            onChange={(e) =>
              handleChange("companyName", e.target.value)
            }
            error={errors.companyName}
            touched={touched.companyName}
          />

          <Input
            label="RUC (Opcional)"
            value={form.ruc}
            onChange={(e) =>
              handleChange("ruc", e.target.value)
            }
          />

          <Input
            label="Dirección"
            icon={MapPin}
            value={form.address}
            onChange={(e) =>
              handleChange("address", e.target.value)
            }
            error={errors.address}
            touched={touched.address}
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 border border-gray-600 py-3 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              ← Volver
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Crear Cuenta
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}