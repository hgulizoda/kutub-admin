import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Box,
  Flex,
  Rating,
  Button,
} from "@mantine/core";
import libraryImages from "../constants/libraries";
import {
  IconDotsVertical,
  IconLocation,
  IconMap,
  IconMapDiscount,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "../api/api";
import queryClient from "../api/query";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";

function LibraryCard(lib) {
  const [open, setOpen] = useState(false);
  const deactivate = useMutation({
    mutationFn: async (id) => {
      return API.patch(`/libraries/library/deactivate/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["libraries"]);
      showNotification({
        title: "Library Activated",
        message: "The library has been successfully activated.",
        color: "green",
        icon: <IconCheck size={18} />,
      });
    },
  });

  const activate = useMutation({
    mutationFn: async (id) => {
      return API.patch(`/libraries/library/activate/${id}/`, {
        is_active: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["libraries"]);
      showNotification({
        title: "Library Deactivated",
        message: "The library has been successfully deactivated.",
        color: "red",
        icon: <IconX size={18} />,
      });
    },
  });

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDeactivate = (e, id) => {
    e.preventDefault();
    deactivate.mutate(id);
    setOpen(false);
  };
  const handleActivate = (e, id) => {
    e.preventDefault();
    activate.mutate(id);
    setOpen(false);
  };
  return (
    <Box
      w="100%"
      h="100%"
      pos={"relative"}
      component={Link}
      to={`/library/${lib.id}/${lib.name}`}
    >
      <Image
        src={libraryImages[Math.floor(lib.id % 5)]}
        style={{ borderRadius: "10px" }}
        fit="cover"
        w={"100%"}
        h={"100%"}
      />

      <Box pos={"absolute"} bottom={0} style={{ padding: "10px 20px 30px" }}>
        <Text c={"white"} fw={700} fz={20}>
          {lib.name}
        </Text>
        <Text c={"white"}>{lib.address.slice(0, 30)}...</Text>
      </Box>
      <Text
        pos={"absolute"}
        top={10}
        right={5}
        bg={lib.is_active ? "green" : "gray"}
        c={"white"}
        style={{ padding: "3px 10px", borderRadius: "10px" }}
      >
        {lib.is_active ? "active" : "inactive"}
      </Text>
      <Button
        onClick={handleOpen}
        pos={"absolute"}
        top={15}
        variant="outline"
        style={{
          position: "absolute",
          top: "15",
          left: "5px",
          border: "none",
        }}
      >
        <IconDotsVertical
          style={{
            color: "black",
          }}
        />
      </Button>
      {open ? (
        <Button
          pos={"absolute"}
          top={40}
          left={10}
          color={lib.is_active ? "#615f5fff" : "#rgba(0, 153, 87, 0.68)"}
          onClick={(e) =>
            lib.is_active
              ? handleDeactivate(e, lib.id)
              : handleActivate(e, lib.id)
          }
        >
          {lib.is_active ? "Deactivate" : "Activate"}
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}

export default LibraryCard;
