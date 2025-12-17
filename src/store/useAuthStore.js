import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      auth: false,
      admin: null,

      logIn: (admin) => set({ auth: true, admin }),
      logOut: () => set({ auth: false, admin: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
