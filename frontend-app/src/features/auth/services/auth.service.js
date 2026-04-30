import api from "../../../services/api";

export const authService = {
  login: async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      // El backend devuelve { success, message, data: { user, token, slug } }
      return res.data; 
    } catch (error) {
      throw {
        message: error.response?.data?.message || "Error al iniciar sesión",
        errors: error.response?.data?.errors || [],
      };
    }
  },

  register: async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || "Error al registrarse",
        errors: error.response?.data?.errors || [],
      };
    }
  },
};