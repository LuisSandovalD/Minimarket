import { useEffect, useState } from "react";
import { companiesService } from "../services/companies.service";

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companiesService.getAll();
      setCompanies(data);
    } catch (err) {
      setError(err.message || "Error al cargar empresas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCompanies();
  }, []);

  const createCompany = async (payload) => {
    const newCompany = await companiesService.create(payload);
    setCompanies((prev) => [...prev, newCompany]);
  };

  const updateCompany = async (id, payload) => {
    const updated = await companiesService.update(id, payload);
    setCompanies((prev) =>
      prev.map((b) => (b.id === id ? updated : b))
    );
  };

  const deleteCompany = async (id) => {
    await companiesService.remove(id);
    setCompanies((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    companies,
    loading,
    error,
    refetch: fetchCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};