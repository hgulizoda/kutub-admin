import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Select, Group, Stack } from "@mantine/core";
import useNotesStore from "../store/useNotes";

export default function AddNoteModal({
  opened,
  setOpened,
  addNote,
  initialValue,
  editId,
}) {
  const [text, setText] = useState("");
  const [importance, setImportance] = useState("low");

  const { editNote } = useNotesStore();

  useEffect(() => {
    if (initialValue) {
      setText(initialValue.text || "");
      setImportance(initialValue.importance || "low");
    }
  }, [initialValue]);

  const handleSave = () => {
    if (!text.trim()) return;

    if (editId) {
      editNote(editId, {
        text,
        importance,
        isDone: initialValue?.isDone || false,
      });
    } else {
      addNote({
        id: Date.now(),
        text,
        importance,
        isDone: false,
      });
    }

    setText("");
    setImportance("low");
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add New Note"
      centered
    >
      <Stack>
        <TextInput
          label="Note Text"
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <Select
          label="Importance"
          data={[
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ]}
          value={importance}
          onChange={setImportance}
        />
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{editId ? "Save" : "Add Note"}</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
