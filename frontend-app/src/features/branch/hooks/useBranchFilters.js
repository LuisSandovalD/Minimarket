import { useMemo, useState } from "react";

export const useBranchFilters = (branches) => {
  const [filters, setFilters] = useState({});

  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      const matchQuery =
        !filters.query ||
        b.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        b.address?.toLowerCase().includes(filters.query.toLowerCase());

      const matchStatus =
        !filters.status ||
        (filters.status === "active" ? b.isActive : !b.isActive);

      return matchQuery && matchStatus;
    });
  }, [branches, filters]);

  return { filters, setFilters, filteredBranches };
};