import { useEffect, useState } from "react";
import Modal from "../../../components/modals/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const ProductsForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
  categories = [], // 👈 importante para futuro
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initialData.name || "",
        price: initialData.price || "",
        description: initialData.description || "",
        categoryId: initialData.categoryId || "",
        isActive: initialData.isActive ?? true,
      });
    } else {
      setForm({
        name: "",
        price: "",
        description: "",
        categoryId: "",
        isActive: true,
      });
    }

    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (!form.categoryId) {
      newErrors.categoryId = "La categoría es obligatoria";
    }

    if (form.description && typeof form.description !== "string") {
      newErrors.description = "La descripción debe ser texto";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      ...form,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
    });
  };

  if (!open) return null;

  return (
    <Modal
      title={initialData ? "Editar Producto" : "Nuevo Producto"}
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

        {/* Nombre */}
        <Input
          name="name"
          label="Nombre"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Precio */}
        <Input
          name="price"
          label="Precio"
          type="number"
          value={form.price}
          onChange={handleChange}
          error={errors.price}
        />

        {/* Descripción */}
        <Input
          name="description"
          label="Descripción"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
        />

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Categoría
          </label>

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId}
            </p>
          )}
        </div>

        {/* Estado */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          <label>Activo</label>
        </div>

      </div>
    </Modal>
  );
};