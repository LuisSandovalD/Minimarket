export const useBranchActions = ({
  createBranch,
  updateBranch,
  deleteBranch,
  setOpen,
  setSelected,
}) => {
  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (branch) => {
    setSelected(branch);
    setOpen(true);
  };

  const handleSubmit = async (selected, data) => {
    try {
      if (selected) {
        await updateBranch(selected.id, data);
      } else {
        await createBranch(data);
      }

      setOpen(false);
      setSelected(null);
    } catch (error) {
      console.error("❌ Error en submit:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar sucursal?")) return;
    await deleteBranch(id);
  };

  return {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};