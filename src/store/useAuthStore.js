import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: localStorage.getItem("auth") === "true" || false,
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  tokens: JSON.parse(localStorage.getItem("tokens")) || null,

  logIn: (newTokens) => {
    set({ tokens: newTokens });
    localStorage.setItem("tokens", JSON.stringify(newTokens));
  },

  setAdmin: (newAdmin) => {
    set({ auth: true, admin: newAdmin });
    localStorage.setItem("admin", JSON.stringify(newAdmin));
    localStorage.setItem("auth", "true");
  },

  logOut: () => {
    set({ auth: false, admin: null, tokens: null });
    localStorage.removeItem("tokens");
    localStorage.removeItem("admin");
    localStorage.removeItem("auth");
  },
}));

export default useAuthStore;
