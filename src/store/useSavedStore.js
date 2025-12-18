import { create } from "zustand";

const useSavedStore = create((set) => ({
  saved: JSON.parse(localStorage.getItem("saved")) || [],

  toggleSaved: (item) =>
    set((state) => {
      const exists = state.saved.find((s) => s.id === item.id);
      let updated;

      if (exists) {
        updated = state.saved.filter((s) => s.id !== item.id);
      } else {
        updated = [...state.saved, item];
      }

      localStorage.setItem("saved", JSON.stringify(updated));
      return { saved: updated };
    }),
}));

export default useSavedStore;
