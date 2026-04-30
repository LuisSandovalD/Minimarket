import { useState, useEffect } from "react";
import CompanyForm from "./CompanyForm";
import { Button } from "../../../components/ui/Button";
import { DataCard } from "../../../components/ui/DataCard";
import { Edit } from "lucide-react";

export default function CompanyCard({
  company,
  isEditing,
  onEdit,
  onCancel,
  onSave,
}) {
  const [form, setForm] = useState(company);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(company);
  }, [company]);

  return (
    <DataCard
      title={company.name}
      actions={
        !isEditing && (
          <Button
          type="button"
            variant="warning"
            leftIcon = {Edit}
            onClick={onEdit}
            className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg"
          >
            Editar
          </Button>
            
        )
      }
    >
      {isEditing ? (
        <>
          <CompanyForm form={form} setForm={setForm} />

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onSave(company.id, form)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Guardar
            </Button>

            <Button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
  
          {/* Campo */}
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">RUC</p>
            <p className="font-medium text-slate-800 dark:text-white">
              {company.ruc || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Correo</p>
            <p className="font-medium text-slate-800 dark:text-white">
              {company.email || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Teléfono</p>
            <p className="font-medium text-slate-800 dark:text-white">
              {company.phone || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Website</p>
            <p className="font-medium text-slate-800 dark:text-white truncate">
              {company.website || "—"}
            </p>
          </div>

          <div className="md:col-span-2 space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Dirección</p>
            <p className="font-medium text-slate-800 dark:text-white">
              {company.address || "—"}
            </p>
          </div>

          {/* Extra info */}
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Tax ID</p>
            <p className="font-medium text-slate-800 dark:text-white">
              {company.taxId || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Representante</p>
            <p className="font-medium text-slate-800 dark:text-white">
              {company.legalRepresentative || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Plan</p>
            <p className="font-medium text-slate-800 dark:text-white">
              {company.subscriptionTier || "FREE"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Estado</p>
            <span
              className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                ${company.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"}
              `}
            >
              {company.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>

        </div>
      )}
    </DataCard>
  );
}