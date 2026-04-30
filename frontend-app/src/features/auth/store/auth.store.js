import { create } from "zustand";

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("ts_user");
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  } catch { return null; }
};

const getStorageItem = (key) => {
  const item = localStorage.getItem(key);
  return item && item !== "undefined" ? item : null;
};

export const useAuthStore = create((set) => ({
  user: getInitialUser(),
  token: getStorageItem("ts_token"),
  slug: getStorageItem("ts_slug"), 
  role: getStorageItem("ts_role"),

  setAuth: ({ user, token, slug, role }) => {
    // 🛡️ Evita que un login malformado borre la sesión
    if (!token || token === "undefined") return;

    localStorage.setItem("ts_token", token);
    localStorage.setItem("ts_user", JSON.stringify(user));
    localStorage.setItem("ts_slug", slug || "");
    localStorage.setItem("ts_role", role || "");

    set({ user, token, slug, role });
  },

  logout: () => {
    localStorage.clear(); // Limpia todo de golpe
    set({ user: null, token: null, slug: null, role: null });
  },
}));