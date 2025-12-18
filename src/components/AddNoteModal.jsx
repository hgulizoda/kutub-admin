import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Select, Group, Stack } from "@mantine/core";
import useNotesStore from "../store/useNotes";
import { useTranslation } from "react-i18next";

export default function AddNoteModal({
  opened,
  setOpened,
  addNote,
  initialValue,
  editId,
}) {
  const [text, setText] = useState("");
  const [importance, setImportance] = useState("low");
  const { t } = useTranslation();
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
      title={t("addNoteModal.title")}
      centered
    >
      <Stack>
        <TextInput
          label={t("addNoteModal.noteLabel")}
          placeholder={t("addNoteModal.notePlaceholder")}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <Select
          label={t("addNoteModal.importanceLabel")}
          data={[
            { value: "high", label: t("addNoteModal.importanceHigh") },
            { value: "medium", label: t("addNoteModal.importanceMedium") },
            { value: "low", label: t("addNoteModal.importanceLow") },
          ]}
          value={importance}
          onChange={setImportance}
        />
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            {t("addNoteModal.cancelButton")}
          </Button>
          <Button onClick={handleSave}>
            {editId
              ? t("addNoteModal.saveButton")
              : t("addNoteModal.addButton")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
