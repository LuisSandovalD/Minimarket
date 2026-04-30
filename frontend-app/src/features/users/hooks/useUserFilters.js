import { useMemo, useState } from "react";

export const useUserFilters = (users) => {
  const [filters, setFilters] = useState({});

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchQuery =
        !filters.query ||
        user.name?.toLowerCase().includes(filters.query.toLowerCase()) ||
        user.email?.toLowerCase().includes(filters.query.toLowerCase());

      const matchRole = !filters.role || user.role === filters.role;
      const matchStatus = !filters.status || user.status === filters.status;

      return matchQuery && matchRole && matchStatus;
    });
  }, [users, filters]);

  return {
    filters,
    setFilters,
    filteredUsers,
  };
};