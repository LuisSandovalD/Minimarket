import { useEffect, useState } from "react";
import Modal from "../../../components/modals/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const BranchForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initialData.name || "",
        address: initialData.address || "",
        phone: initialData.phone || "",
      });
    } else {
      setForm({
        name: "",
        address: "",
        phone: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.address) {
      alert("Nombre y dirección son obligatorios");
      return;
    }

    onSubmit(form);
  };

  if (!open) return null;

  return (
    <Modal
      title={initialData ? "Editar Sucursal" : "Nueva Sucursal"}
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
        />

        <Input
          name="address"
          label="Dirección"
          value={form.address}
          onChange={handleChange}
        />

        <Input
          name="phone"
          label="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
    </Modal>
  );
};