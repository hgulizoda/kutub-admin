import { Button, Container, Flex, Stack, Text } from "@mantine/core";
import useNotesStore from "../store/useNotes";
import NoteCard from "../components/NotesCard";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import AddNoteModal from "../components/AddNoteModal";
import { useTranslation } from "react-i18next";

const Notes = () => {
  const { notes, deleteNote } = useNotesStore();
  const [editId, setEditId] = useState();
  const [opened, setOpened] = useState(false);
  const addNote = useNotesStore((state) => state.addNote);
  const [initialValue, setInitialValue] = useState({});
  const { t } = useTranslation();
  return (
    <>
      <Container size="xl">
        <Text fz={"h2"}>{t("notesPage.title")}</Text>
        <Stack w="70%" mt={100} style={{ justifySelf: "center" }}>
          {notes.map((note) => (
            <Flex w={"100%"} justify={"space-between"}>
              <NoteCard key={note.id} editId={editId} {...note} />
              <Flex gap={10}>
                <Button
                  p={10}
                  color="red"
                  variant="outline"
                  onClick={() => deleteNote(note.id)}
                >
                  <IconTrash size={16} />
                </Button>
                <Button
                  p={10}
                  color="yellow"
                  variant="outline"
                  onClick={() => {
                    setEditId(note.id);
                    const editElement = notes.find(
                      (item) => item.id === note.id
                    );
                    setInitialValue(editElement);
                    setOpened(true);
                  }}
                >
                  <IconEdit size={16} />
                </Button>
              </Flex>
            </Flex>
          ))}
          <Flex justify={"space-between"} mt={20}>
            <Button
              variant="outline"
              w={200}
              mb={20}
              onClick={() => {
                setEditId(null);
                setOpened(true);
              }}
            >
              <IconPlus />
              <Text fz={14}>{t("notesPage.addButton")}</Text>
            </Button>
            <Stack>
              <Text>
                {t("notesPage.total")} {notes.length} {t("notesPage.tasks")}
              </Text>
              <Text>
                {t("notesPage.efficiency")}{" "}
                {(
                  notes.filter((item) => item.isDone).length / notes.length
                ).toFixed(1) * 100}{" "}
                %
              </Text>
            </Stack>
          </Flex>
          <AddNoteModal
            opened={opened}
            setOpened={setOpened}
            addNote={addNote}
            initialValue={initialValue}
            editId={editId}
          />
        </Stack>
      </Container>
    </>
  );
};

export default Notes;
