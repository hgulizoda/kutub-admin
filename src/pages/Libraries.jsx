import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import theme from "../style/theme";
import { useColorScheme } from "@mantine/hooks";
import LibraryCard from "../components/LibraryGridCard";

const Libraries = () => {
  const { colorScheme } = useColorScheme();
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const { data } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const res = await API.get("/libraries/libraries/");
      return res.data;
    },
  });

  useEffect(() => {
    if (!data) return;
    switch (filter) {
      case "active":
        setFiltered(data.filter((lib) => lib.is_active));

        break;
      case "inactive":
        setFiltered(data.filter((lib) => !lib.is_active));
        break;
      default:
        setFiltered(data);
    }
  }, [data, filter]);

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text fz={"h2"} mb={20}>
          Libraries
        </Text>
        <Flex justify={"space-between"}>
          <Group spacing={-2}>
            <Button
              variant={filter === "all" ? "filled" : "outline"}
              color="green"
              onClick={() => setFilter("all")}
              radius="xl"
              size="sm"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                minWidth: 60,
              }}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "filled" : "outline"}
              color={theme.other.box2[colorScheme]}
              onClick={() => setFilter("active")}
              radius="xl"
              size="sm"
              sx={{
                borderRadius: 0,
                minWidth: 70,
              }}
            >
              Active
            </Button>
            <Button
              variant={filter === "inactive" ? "filled" : "outline"}
              color="gray"
              onClick={() => setFilter("inactive")}
              radius="xl"
              size="sm"
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                minWidth: 80,
              }}
            >
              Inactive
            </Button>
          </Group>
        </Flex>
      </Box>

      <Grid>
        {filtered.map((item) => (
          <Grid.Col span={2.6} h={400} m={7}>
            <LibraryCard key={item.id} {...item} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default Libraries;
