import api from "../../../services/api"; // axios instance con Bearer

export const productService = {
  getAll: async () => {
    const { data } = await api.get("/products");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/products", payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};