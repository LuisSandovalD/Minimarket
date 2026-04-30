import { useEffect, useState } from "react";
import { productService } from "../services/product.service";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const createProduct = async (payload) => {
    const newProduct = await productService.create(payload);
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = async (id, payload) => {
    const updated = await productService.update(id, payload);
    setProducts((prev) =>
      prev.map((b) => (b.id === id ? updated : b))
    );
  };

  const deleteProduct = async (id) => {
    await productService.remove(id);
    setProducts((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};