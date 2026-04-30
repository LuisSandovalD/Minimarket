import api from "../../../services/api";

// Obtener usuarios - desempaquetado flexible
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get("/users", { params });
    const data = response.data;
    
    if (Array.isArray(data)) {
      return data;
    }
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }
    if (data?.users && Array.isArray(data.users)) {
      return data.users;
    }
    
    console.warn("Estructura de API no reconocida:", data);
    return [];
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Crear usuario
export const createUser = async (payload) => {
  try {
    const { data } = await api.post("/users", payload);
    return data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// Actualizar usuario
export const updateUser = async (id, payload) => {
  try {
    const { data } = await api.put(`/users/${id}`, payload);
    return data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};