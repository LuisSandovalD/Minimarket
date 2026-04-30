import api from "../../../services/api"; // axios instance con Bearer

export const companiesService = {
  getAll: async () => {
    const { data } = await api.get("/companies");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/companies/${id}`);
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/companies", payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/companies/${id}`, payload);
    return data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/companies/${id}`);
    return data;
  },
};