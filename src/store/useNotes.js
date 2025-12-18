import { create } from "zustand";

const initialNotes = [
  { id: 1, text: "Deactivate 3rd library", importance: "high", isDone: false },
  {
    id: 2,
    text: "Activate all requested libraries",
    importance: "medium",
    isDone: true,
  },
  { id: 3, text: "List books", importance: "low", isDone: false },
  {
    id: 4,
    text: "Deactivate 10th library",
    importance: "medium",
    isDone: false,
  },
  { id: 5, text: "Add another library", importance: "low", isDone: false },
];

const useNotesStore = create((set) => ({
  notes: JSON.parse(localStorage.getItem("notes")) || initialNotes,

  addNote: (newNote) =>
    set((state) => {
      const updatedNotes = [...state.notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return { notes: updatedNotes };
    }),

  deleteNote: (noteId) =>
    set((state) => {
      const updatedNotes = state.notes.filter((note) => note.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return { notes: updatedNotes };
    }),

  editNote: (noteId, updatedFields) =>
    set((state) => {
      const updatedNotes = state.notes.map((note) =>
        note.id === noteId ? { ...note, ...updatedFields } : note
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return { notes: updatedNotes };
    }),
}));

export default useNotesStore;
