/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useCallback } from "react";
import { useBranches } from "../../branch/hooks/useBranches";
import { useAuthStore } from "../../auth/store/auth.store";

import Modal from "../../../components/modals/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import InputPassword from "../../../components/ui/InputPassword";

export const UserForm = ({ open, onClose, onSubmit, initialData }) => {
  const { branches, loading } = useBranches();

  const currentUser = useAuthStore((s) => s.user);
  const currentRole = currentUser?.role?.toUpperCase().trim();
  const userBranchId = currentUser?.branchId;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    branchId: ""
  });

  const [errors, setErrors] = useState({});

  // 🚫 EMPLOYEE no puede crear
  if (currentRole === "EMPLOYEE") return null;

  // 🔥 Roles permitidos
  const getAllowedRoles = useCallback(() => {
    if (currentRole === "ADMIN") {
      return [{ value: "MANAGER", label: "Gerente" }];
    }
    if (currentRole === "MANAGER") {
      return [{ value: "EMPLOYEE", label: "Empleado" }];
    }
    return [];
  }, [currentRole]);

  // 🔁 Cargar datos
  useEffect(() => {
    const allowedRoles = getAllowedRoles();

    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || allowedRoles[0]?.value || "",
        branchId:
          currentRole === "MANAGER"
            ? userBranchId // 🔥 manager usa su sucursal
            : initialData.branchId || ""
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        role: allowedRoles[0]?.value || "",
        branchId:
          currentRole === "MANAGER"
            ? userBranchId // 🔥 automático
            : ""
      });
    }
  }, [initialData, open, getAllowedRoles, currentRole, userBranchId]);

  // 🔹 Inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (value) => {
    setForm({
      ...form,
      password: value
    });
  };

  // 🔍 Validación
  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "Nombre mínimo 3 caracteres";
    }

    if (!form.email || !form.email.includes("@")) {
      newErrors.email = "Email inválido";
    }

    if (!initialData && form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (currentRole === "ADMIN" && !form.branchId) {
      newErrors.branchId = "Sucursal requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 Submit
  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: form.role?.toUpperCase(),
      branchId:
        currentRole === "MANAGER"
          ? Number(userBranchId) // 🔥 forzado correctamente
          : Number(form.branchId)
    };

    console.log("✅ ENVIANDO:", payload);

    onSubmit(payload);
    onClose();
  };

  const isDisabled =
    !form.name ||
    !form.email ||
    (!initialData && !form.password);

  if (!open) return null;

  return (
    <Modal
      title={initialData ? "Editar Usuario" : "Nuevo Usuario"}
      onClose={onClose}
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isDisabled}>
            Guardar
          </Button>
        </div>
      }
    >
      <div className="space-y-5">

        <div className="grid gap-4">

          {/* Nombre */}
          <Input
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Rol */}
          <Select
            label="Rol"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={getAllowedRoles()}
          />

          {/* Email */}
          <Input
            label="Correo"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}
          <InputPassword
            label="Contraseña"
            value={form.password}
            onChange={handlePasswordChange}
            error={errors.password}
          />

        </div>

        {/* 🏢 SUCURSAL */}
        {currentRole === "ADMIN" ? (
          <Select
            label="Sucursal"
            name="branchId"
            value={form.branchId}
            onChange={handleChange}
            error={errors.branchId}
            options={[
              { value: "", label: loading ? "Cargando..." : "Seleccionar..." },
              ...branches.map((b) => ({
                value: b.id,
                label: b.name,
              })),
            ]}
          />
        ) : (
          <div>
            <label className="text-sm font-medium">Sucursal</label>
            <div className="mt-1 px-3 py-2 border rounded bg-gray-100">
              {
                branches.find(b => b.id === userBranchId)?.name ||
                "Asignada automáticamente"
              }
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};