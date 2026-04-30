import { Input } from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";

export default function CompanyForm({ form, setForm }) {
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="space-y-8">
      
      {/* 🧾 Información General */}
      <section className="space-y-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Información General
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Nombre"
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ej: Minimarket Don Lucho"
          />

          <Input
            label="Slug"
            value={form.slug || ""}
            onChange={(e) => handleChange("slug", e.target.value)}
            placeholder="ej: don-lucho"
          />

          <Input
            label="RUC"
            value={form.ruc || ""}
            onChange={(e) => handleChange("ruc", e.target.value)}
            placeholder="11 dígitos"
          />

          <Input
            label="Tax ID"
            value={form.taxId || ""}
            onChange={(e) => handleChange("taxId", e.target.value)}
            placeholder="Identificador fiscal"
          />
        </div>
      </section>

      {/* 📞 Contacto */}
      <section className="space-y-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Contacto
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Correo electrónico"
            type="email"
            value={form.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="correo@empresa.com"
          />

          <Input
            label="Teléfono"
            value={form.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+51 999 999 999"
          />

          <Input
            label="Sitio web"
            value={form.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://..."
          />

          <Input
            label="Dirección"
            value={form.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Dirección completa"
          />
        </div>
      </section>

      {/* ⚖️ Información Legal */}
      <section className="space-y-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Información Legal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Representante Legal"
            value={form.legalRepresentative || ""}
            onChange={(e) =>
              handleChange("legalRepresentative", e.target.value)
            }
            placeholder="Nombre completo"
          />

          <Input
            label="Plan de Suscripción"
            value={form.subscriptionTier || ""}
            onChange={(e) =>
              handleChange("subscriptionTier", e.target.value)
            }
            placeholder="FREE / PRO / ENTERPRISE"
          />
        </div>
      </section>

      {/* ⚙️ Estado */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Estado
        </h3>

        <Checkbox
          label="Activo"
          checked={form.isActive || false}
          onChange={(e) => handleChange("isActive", e.target.checked)}
        />
      </section>

    </div>
  );
}