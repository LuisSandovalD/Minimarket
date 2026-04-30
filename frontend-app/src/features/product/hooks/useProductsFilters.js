import { useMemo, useState } from "react";

export const useProductFilters = (products) => {
  const [filters, setFilters] = useState({});

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchQuery =
        !filters.query ||
        p.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        p.description?.toLowerCase().includes(filters.query.toLowerCase());

      const matchStatus =
        !filters.status ||
        (filters.status === "active" ? p.isActive : !p.isActive);

      return matchQuery && matchStatus;
    });
  }, [products, filters]);

  return { filters, setFilters, filteredProducts };
};