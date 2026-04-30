export const useUserActions = ({
  createUser,
  updateUser,
  deleteUser,
  setOpen,
  setSelected,
}) => {
  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (user) => {
    setSelected(user);
    setOpen(true);
  };

  const handleSubmit = async (selected, data) => {
    if (selected) {
      await updateUser(selected.id, data);
    } else {
      await createUser(data);
    }

    setOpen(false);
    setSelected(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar usuario?")) {
      await deleteUser(id);
    }
  };

  return {
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};