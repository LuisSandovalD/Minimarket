import api from "../../../services/api"; // axios instance con Bearer

export const branchService = {
  getAll: async () => {
    const { data } = await api.get("/branches");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/branches/${id}`);
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/branches", payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/branches/${id}`, payload);
    return data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/branches/${id}`);
    return data;
  },
};