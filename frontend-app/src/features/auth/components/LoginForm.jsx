import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import InputPassword from "../../../components/ui/InputPassword";
import { Button } from "../../../components/ui/Button";

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido";
    if (!form.password) newErrors.password = "La contraseña es obligatoria";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);

    setLoading(true);
    try {
      await onSubmit?.(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="correo@ejemplo.com"
        icon={Mail}
        value={form.email}
        error={errors.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          setErrors({ ...errors, email: "" });
        }}
      />

      <div className="space-y-1">
        <InputPassword
          label="Contraseña"
          showValidation={false}
          value={form.password}
          onChange={(val) => {
            setForm({ ...form, password: val });
            setErrors({ ...errors, password: "" });
          }}
        />
        {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password}</p>}
      </div>

      <Button type="submit" full loading={loading} icon={Lock}>
        Iniciar sesión
      </Button>
    </form>
  );
}