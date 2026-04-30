import { useMemo, useState } from "react";

export const useCategoryFilters = (categories) => {
  const [filters, setFilters] = useState({});

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchQuery =
        !filters.query ||
        c.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        c.description?.toLowerCase().includes(filters.query.toLowerCase());

      const matchStatus =
        !filters.status ||
        (filters.status === "active" ? c.isActive : !c.isActive);

      return matchQuery && matchStatus;
    });
  }, [categories, filters]);

  return { filters, setFilters, filteredCategories };
};