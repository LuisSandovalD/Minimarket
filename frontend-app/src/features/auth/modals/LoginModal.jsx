import { useState, useEffect } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import Modal from "../../../components/modals/Modal";

import { getDashboardRoute } from "../../../utils/roleRoutes";

export default function LoginModal({ onClose, defaultValues }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (error) setError("");
  }, [defaultValues, error]);

  const handleSubmit = async (data) => {
    setError("");

    try {
      const res = await login(data);

      // 🔥 Validación fuerte
      if (!res || !res.success) {
        setError(res?.message || "Error al iniciar sesión");
        return;
      }

      if (!res.role || !res.slug) {
        setError("Respuesta inválida del servidor");
        return;
      }

      // ✅ Aquí está la clave (sin hardcodear rutas)
      const route = getDashboardRoute({
        slug: res.slug,
        role: res.role, // puede venir ADMIN, admin, etc.
      });

      navigate(route);

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Error inesperado");
    }
  };

  return (
    <Modal
      title="Iniciar sesión"
      icon={LogIn}
      onClose={onClose}
    >
      {error && (
        <div className="mb-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-md">
          {error}
        </div>
      )}

      <LoginForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </Modal>
  );
}