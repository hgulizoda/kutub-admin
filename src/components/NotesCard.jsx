import React from "react";
import { Card, Text, Group, Checkbox, Badge } from "@mantine/core";

export default function NoteCard(note) {
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
    e.prevenetDefault();
  }

  return (
    <Card bg={"transparent"} m={0} p={0} py={5}>
      <Group position="apart" align="center">
        <Checkbox checked={note.isDone} onChange={handleChecked} />
        <Text
          lineClamp={2}
          style={{
            textDecoration: note.isDone ? "line-through" : "none",
            flex: 1,
            marginLeft: 10,
          }}
        >
          {note.text}
        </Text>
        <Badge color={getBadgeColor(note.importance)} variant="filled">
          {note.importance}
        </Badge>
      </Group>
    </Card>
  );
}
