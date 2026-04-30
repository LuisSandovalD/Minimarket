// category.services.js
import api from "../../../services/api";

export const categoryService = {
  getAll: async () => {
    const res = await api.get("/category");
    return res.data.data; // 🔥 SOLO el array
  },

  getById: async (id) => {
    const res = await api.get(`/category/${id}`);
    return res.data.data;
  },

  create: async (payload) => {
    const res = await api.post("/category", payload);
    return res.data.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/category/${id}`, payload);
    return res.data.data;
  },

  remove: async (id) => {
    await api.delete(`/category/${id}`);
  },
};