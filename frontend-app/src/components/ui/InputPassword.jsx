import { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function InputPassword({
  label = "Contraseña",
  confirm = false,
  showValidation = false, // 👈 NUEVO
  error = "",
  value = "",
  onChange,
}) {
  const [password, setPassword] = useState(value);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  // 🔐 Validaciones
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
  };

  const isStrong =
    validations.length && validations.uppercase && validations.number;

  const match = password === confirmPassword && confirmPassword !== "";

  const handlePasswordChange = (val) => {
    setPassword(val);
    onChange?.(val);
  };

  return (
    <div className="space-y-4">
      
      {/* INPUT PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`
              w-full px-4 py-2.5 pr-10
              rounded-lg border
              ${
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }
              bg-white dark:bg-gray-900
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 outline-none
              mt-1
            `}
            placeholder="••••••••"
          />

          {/* Toggle */}
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* 🔴 ERROR (solo esto en login) */}
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}

        {/* 🔐 VALIDACIONES (SOLO SI showValidation = true) */}
        {showValidation && (
          <>
            <div className="mt-2 space-y-1 text-xs">
              <p className={`flex items-center gap-1 ${validations.length ? "text-green-500" : "text-gray-400"}`}>
                {validations.length ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                Mínimo 8 caracteres
              </p>

              <p className={`flex items-center gap-1 ${validations.uppercase ? "text-green-500" : "text-gray-400"}`}>
                {validations.uppercase ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                Una letra mayúscula
              </p>

              <p className={`flex items-center gap-1 ${validations.number ? "text-green-500" : "text-gray-400"}`}>
                {validations.number ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                Un número
              </p>
            </div>

            {/* Barra */}
            <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  isStrong ? "w-full bg-green-500" : "w-1/2 bg-yellow-500"
                }`}
              />
            </div>
          </>
        )}
      </div>

      {/* CONFIRM PASSWORD (SOLO REGISTRO) */}
      {confirm && showValidation && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirmar contraseña
          </label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`
                w-full px-4 py-2.5 pr-10
                rounded-lg border
                ${
                  confirmPassword === ""
                    ? "border-gray-300 dark:border-gray-700"
                    : match
                    ? "border-green-500"
                    : "border-red-500"
                }
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-blue-500 outline-none
              `}
              placeholder="••••••••"
            />
          </div>

          {confirmPassword && (
            <p
              className={`mt-1 text-xs flex items-center gap-1 ${
                match ? "text-green-500" : "text-red-500"
              }`}
            >
              {match ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              {match ? "Las contraseñas coinciden" : "No coinciden"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}