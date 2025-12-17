import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      auth: false,
      admin: null,
      tokens: null,

      logIn: (newTokens) => set({ tokens: newTokens }),
      logOut: () => set({ auth: false, admin: null, tokens: null }),
      setAdmin: (newadmin) => set({ auth: true, admin: newadmin }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
