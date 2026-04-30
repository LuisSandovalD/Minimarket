export const useProductActions = ({
  createProduct,
  updateProduct,
  deleteProduct,
  setOpen,
  setSelected,
}) => {
  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleSubmit = async (selected, data) => {
    try {
      if (selected) {
        await updateProduct(selected.id, data);
      } else {
        await createProduct(data);
      }

      setOpen(false);
      setSelected(null);
    } catch (error) {
      console.error("❌ Error en submit:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await deleteProduct(id);
  };

  return {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};