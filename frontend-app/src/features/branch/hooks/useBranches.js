import { useEffect, useState } from "react";
import { branchService } from "../services/branchService";

export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const data = await branchService.getAll();
      setBranches(data);
    } catch (err) {
      setError(err.message || "Error al cargar sucursales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBranches();
  }, []);

  const createBranch = async (payload) => {
    const newBranch = await branchService.create(payload);
    setBranches((prev) => [...prev, newBranch]);
  };

  const updateBranch = async (id, payload) => {
    const updated = await branchService.update(id, payload);
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? updated : b))
    );
  };

  const deleteBranch = async (id) => {
    await branchService.remove(id);
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    branches,
    loading,
    error,
    refetch: fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
  };
};