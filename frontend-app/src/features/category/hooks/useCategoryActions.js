export const useCategoryActions = ({
  createCategory,
  updateCategory,
  deleteCategory,
  setOpen,
  setSelected,
}) => {
  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (category) => {
    setSelected(category);
    setOpen(true);
  };

  const handleSubmit = async (selected, data) => {
    try {
      if (selected) {
        await updateCategory(selected.id, data);
      } else {
        await createCategory(data);
      }

      setOpen(false);
      setSelected(null);
    } catch (error) {
      console.error("❌ Error en submit:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar categoría?")) return;
    await deleteCategory(id);
  };

  return {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};