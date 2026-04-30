import { useEffect, useState, useCallback } from "react";
import { categoryService } from "../services/category.services";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await categoryService.getAll(); 
      setCategories(data);

    } catch (err) {
      console.error(err);
      setError(err.message || "Error al cargar categorías");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (payload) => {
    try {
      const newCategory = await categoryService.create(payload);

      setCategories((prev) => [...prev, newCategory]);

      return newCategory;
    } catch (err) {
      setError(err.message || "Error al crear categoría");
      throw err;
    }
  };

  const updateCategory = async (id, payload) => {
    try {
      const updated = await categoryService.update(id, payload);

      setCategories((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );

      return updated;
    } catch (err) {
      setError(err.message || "Error al actualizar categoría");
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.remove(id);

      setCategories((prev) =>
        prev.filter((c) => c.id !== id)
      );
    } catch (err) {
      setError(err.message || "Error al eliminar categoría");
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};