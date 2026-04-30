import { useState } from "react";
import { useCompanies } from "../hooks/useCompanies";
import CompanyList from "../components/CompanyList";
import CampanyHeader from "../components/CompanyHeader";

export default function CompaniesPage() {
  const { companies, loading, error, updateCompany } = useCompanies();
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => setEditingId(id);
  const handleCancel = () => setEditingId(null);

  const handleSave = async (id, data) => {
    await updateCompany(id, data);
    setEditingId(null);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <CampanyHeader />
      <CompanyList
        companies={companies}
        editingId={editingId}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
}