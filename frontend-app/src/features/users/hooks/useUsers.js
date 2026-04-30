import { useEffect, useState } from "react";
import {
  getUsers,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/user.service";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchUsers error:", err);
      setError(err.response?.data || err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (payload) => {
    try {
      await createUserService(payload);
      await fetchUsers();
    } catch (err) {
      console.error("createUser error:", err);
      throw err;
    }
  };

  const updateUser = async (id, payload) => {
    try {
      await updateUserService(id, payload);
      await fetchUsers();
    } catch (err) {
      console.error("updateUser error:", err);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserService(id);
      await fetchUsers();
    } catch (err) {
      console.error("deleteUser error:", err);
      throw err;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
};