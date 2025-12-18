import {
  BackgroundImage,
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  Indicator,
  Loader,
  ScrollArea,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "@mantine/dates";
import { IconMoodSmileBeam } from "@tabler/icons-react";
import useNotesStore from "../store/useNotes";
import NoteCard from "../components/NotesCard";
import libraryImages from "../constants/libraries";
const Dashboard = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { notes } = useNotesStore();
  const navigate = useNavigate();

  const { data: books, isFetching } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books");
      return res.data.slice(0, 5);
    },
  });

  const { data: libraries, isFetching: isFetchingLIb } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const res = await API.get("/libraries/libraries/");
      return res.data.slice(0, 10);
    },
  });

  return (
    <>
      <Grid w={"100%"} gap={30}>
        <Grid.Col
          span={5}
          component={Link}
          to={"/books"}
          ml={60}
          h={300}
          bg={theme.other.box1[colorScheme]}
          style={{
            borderRadius: "28px",
            padding: "20px 30px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Text c={"#0f0e0eff"} fz={"h3"} mb={20}>
            Most read books
          </Text>
          {isFetching ? (
            <Center style={{ height: "100%", width: "100%" }}>
              <Loader size="xl" variant="dots" />
            </Center>
          ) : (
            <ScrollArea w={"100%"} h={"79%"}>
              <Stack gap={6}>
                {books
                  ?.sort(
                    (a, b) => b.quantity_in_library - a.quantity_in_library
                  )
                  .map((book, index) => (
                    <Card
                      key={book.id}
                      pb={10}
                      style={{
                        padding: "5px 0px",
                        borderBottom: "1px solid white",
                      }}
                      bg={"transparent"}
                    >
                      <Group justify="space-between">
                        <Flex gap={10}>
                          <Text fw={600} c={"#000000af"}>
                            #{index + 1}
                          </Text>
                          <Stack gap={4} c={"#000000af"}>
                            <Text fw={500}>{book.name}</Text>
                            <Text size="sm" c={"white"} fw={700}>
                              {book.author}
                            </Text>
                          </Stack>
                        </Flex>

                        <Text
                          fw={600}
                          bg={"teal.9"}
                          c={"white"}
                          style={{ padding: "5px 20px", borderRadius: "20px" }}
                          fz={15}
                        >
                          {book.quantity_in_library * 100} read
                        </Text>
                      </Group>
                    </Card>
                  ))}
              </Stack>
            </ScrollArea>
          )}
        </Grid.Col>

        <Grid.Col
          span={5}
          bg={theme.other.box3[colorScheme]}
          ml={40}
          style={{ padding: "30px 40px", borderRadius: "30px" }}
          pos={"relative"}
        >
          <Box
            pos={"absolute"}
            top={120}
            right={60}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
            }}
          >
            <IconMoodSmileBeam color="white" />
            <Text c={"white"}>Have a good day</Text>
          </Box>

          <Calendar
            nextMonthLabel="→"
            previousMonthLabel="←"
            w="100%"
            styles={{
              calendarHeader: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 30,
                width: "100%",
                marginInline: 0,
                gap: "0",
              },

              calendarHeaderControl: {
                width: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 0,
                padding: 0,
                svg: {
                  width: 16,
                  height: 16,
                  margin: "0px",
                },
              },
              weekdayCell: {
                fontSize: 12,
                fontWeight: 600,
              },
              day: {
                fontSize: 12,
                width: 28,
                height: 28,
              },
            }}
          />
        </Grid.Col>

        <Grid.Col
          span={6}
          bg={theme.other.box4[colorScheme]}
          style={{ borderRadius: "20px", padding: "20px 30px" }}
          w={"100%"}
          h={350}
          mb={50}
          mt={20}
          ml={40}
          component={Link}
          to="/libraries"
        >
          <Text c={"#0f0e0eff"} fz={"h3"} mb={20}>
            Most popular Libraries
          </Text>
          {isFetchingLIb ? (
            <Center style={{ height: "100%", width: "100%" }}>
              <Loader size="xl" variant="dots" />
            </Center>
          ) : (
            <ScrollArea type="auto" scrollbarSize={6} style={{ width: "100%" }}>
              <Flex
                style={{
                  gap: 8,
                  width: "max-content",
                  flexWrap: "nowrap",
                }}
              >
                {libraries?.map((lib) => (
                  <Box
                    key={lib.id}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/library/${lib.id}/${lib.name}`);
                    }}
                    style={{
                      width: 150,
                      aspectRatio: "1 / 1.5",
                      position: "relative",
                      borderRadius: 8,
                      overflow: "hidden",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      cursor: "pointer",
                      flex: "0 0 auto",
                    }}
                  >
                    <Image
                      src={libraryImages[Math.floor(lib.id % 5)]}
                      alt={lib.name}
                      fit="cover"
                      height="100%"
                      width="100%"
                    />

                    <Box
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.6)",
                        padding: "2px 4px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Text size={10} color="white" weight={700} lineClamp={1}>
                        {lib.name}
                      </Text>
                      <Badge size="xs" color={lib.is_active ? "green" : "gray"}>
                        {lib.is_active ? "active" : "inactive"}
                      </Badge>
                    </Box>
                  </Box>
                ))}
              </Flex>
            </ScrollArea>
          )}
        </Grid.Col>

        <Grid.Col
          span={4}
          bg={theme.other.box5[colorScheme]}
          style={{ borderRadius: "20px", padding: "20px 40px" }}
          w={"100%"}
          h={350}
          mb={50}
          mt={40}
          ml={30}
          component={Link}
          to="/notes"
        >
          <Text c={"#0f0e0eff"} fz={"h3"} mb={20}>
            My notes
          </Text>
          <ScrollArea gap={0}>
            {notes
              .filter((note) => note.importance === "high" || "medium")
              .slice(0, 4)
              .map((note) => (
                <NoteCard key={note.id} {...note} />
              ))}
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Dashboard;
