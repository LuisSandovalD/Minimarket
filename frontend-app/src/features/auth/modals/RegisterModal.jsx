import { useState } from "react";
import { UserPlus } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import Modal from "../../../components/modals/Modal";
import { Button } from "../../../components/ui/Button";
import RegisterForm from "../components/RegisterForm";
import { Toast } from "../../../components/ui/Toast";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const { register } = useAuth();

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await register(data);

      console.log("REGISTER RESPONSE:", res); // 🔥 DEBUG CLAVE

      if (!res?.success) {
        setToast({
          message: res?.message || "Error al registrarse ❌",
          type: "error",
        });

        setTimeout(() => setToast(null), 3000);
        return;
      }

      setToast({
        message: "Cuenta creada correctamente 🎉",
        type: "success",
      });

      setTimeout(() => {
        setToast(null);
        onClose();

        onSwitchToLogin({
          email: data.email,
          password: data.password,
        });
      }, 1200);

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setToast({
        message:
          error?.response?.data?.message ||
          "Error inesperado al registrarse ❌",
        type: "error",
      });

      setTimeout(() => setToast(null), 3000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Crear cuenta"
        icon={UserPlus}
        onClose={onClose}
        footer={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSwitchToLogin()}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        }
      >
        <RegisterForm
          onSubmit={handleSubmit}
          loading={loading} // 🔥 IMPORTANTE
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}