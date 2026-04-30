import CompanyCard from "./CompanyCard";

export default function CompanyList({
  companies,
  editingId,
  onEdit,
  onCancel,
  onSave,
}) {
  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          isEditing={editingId === company.id}
          onEdit={() => onEdit(company.id)}
          onCancel={onCancel}
          onSave={onSave}
        />
      ))}
    </div>
  );
}