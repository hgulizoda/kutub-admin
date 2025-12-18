import React, { useState } from "react";
import {
  Card,
  Text,
  Group,
  Checkbox,
  Badge,
  TextInput,
  Button,
} from "@mantine/core";
import useNotesStore from "../store/useNotes";
import { IconPlus } from "@tabler/icons-react";

export default function NoteCard({ id, text, importance, isDone, editId }) {
  console.log(editId);
  const { checkNote, notes } = useNotesStore();
  const data = notes.find((item) => item.id === id);
  const [checked, setChecked] = useState(isDone);

  const getBadgeColor = (importance) => {
    switch (importance) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  function handleChecked(e) {
    checkNote(data);
    setChecked(e.currentTarget.checked);
  }

  console.log(editId);

  return (
    <Card bg={"transparent"} m={0} p={0} py={5}>
      <Group position="apart" align="center">
        <Checkbox checked={checked} onChange={handleChecked} />
        <Text
          lineClamp={2}
          w={400}
          style={{
            textDecoration: isDone ? "line-through" : "none",
            flex: 1,
            marginLeft: 10,
          }}
        >
          {text}
        </Text>
        <Badge color={getBadgeColor(importance)} variant="filled">
          {importance}
        </Badge>
      </Group>
    </Card>
  );
}
