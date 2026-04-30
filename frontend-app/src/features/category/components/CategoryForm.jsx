import { useEffect, useState } from "react";
import Modal from "../../../components/modals/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const CategoryForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
      });
    } else {
      setForm({
        name: "",
      });
    }

    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      name: form.name.trim(),
    });
  };

  if (!open) return null;

  return (
    <Modal
      title={initialData ? "Editar Categoría" : "Nueva Categoría"}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      }
    >
      <div className="space-y-4">

        <Input
          name="name"
          label="Nombre"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

      </div>
    </Modal>
  );
};