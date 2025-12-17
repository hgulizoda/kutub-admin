import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock, IconMoon, IconSun } from "@tabler/icons-react";
import qodiriy from "../assets/images/abdulla qodiriy.jpg";
import lib1 from "../assets/images/lib1.jpg";
import cholpon from "../assets/images/cho'lpon.jpg";
import otkir from "../assets/images/o'tkir xoshimov.jpg";
import jkrowling from "../assets/images/jkrowling.jpg";
import book1984 from "../assets/images/1984.jpg";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { logIn, setAdmin } = useAuthStore();
  const [error, setError] = useState("");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      phone: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await API.post("/auth/login/", data);
    },
    onSuccess: (res) => {
      console.log("Login success:", res.data);
      logIn(res.data);
    },
    onError: (err) => {
      console.log(err.response?.data?.detail);
      setError(err.response?.data?.detail || "Something went wrong");
    },
  });

  const { data } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await API.get("/auth/admin/profile/");
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      navigate("/");
      setAdmin(data);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form.values);
  };

  return (
    <Container size={"xl"}>
      <Flex justify={"center"} align={"center"}>
        <Box w={"40%"}>
          <Grid>
            <Grid.Col span={3} style={{ alignSelf: "end" }}>
              <Image src={qodiriy} style={{ borderRadius: "8px" }} />
            </Grid.Col>
            <Grid.Col span={4.5}>
              <Image src={otkir} style={{ borderRadius: "8px" }} />
            </Grid.Col>
            <Grid.Col span={4} style={{ alignSelf: "end" }}>
              <Image src={lib1} style={{ borderRadius: "8px" }} />
            </Grid.Col>
            <Grid.Col span={5}>
              <Image src={cholpon} style={{ borderRadius: "8px" }} />
            </Grid.Col>
            <Grid.Col span={4}>
              <Image src={jkrowling} style={{ borderRadius: "8px" }} />
            </Grid.Col>
            <Grid.Col span={3}>
              <Image src={book1984} style={{ borderRadius: "8px" }} />
            </Grid.Col>
          </Grid>
        </Box>
        <Box
          w={"50%"}
          h={"100vh"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            radius="lg"
            p="xl"
            w={420}
            shadow="md"
            withBorder
            component="form"
            onSubmit={handleSubmit}
          >
            <Group justify="space-between" mb="sm">
              <Text fw={600} fz="lg">
                Admin Login
              </Text>

              <ActionIcon variant="subtle" onClick={toggleColorScheme}>
                {colorScheme === "light" ? (
                  <IconMoon size={18} />
                ) : (
                  <IconSun size={18} />
                )}
              </ActionIcon>
            </Group>

            <Divider mb="md" />

            <Stack gap="md">
              <TextInput
                label="Phone"
                placeholder="+998 90 123 45 67"
                inputMode="tel"
                value={form.values.phone}
                onChange={(e) => {
                  const value = e.currentTarget.value
                    .replace(/\p{L}/gu, "")
                    .slice(0, 13);
                  form.setFieldValue("phone", value);
                }}
              />

              <PasswordInput
                label="Password"
                placeholder="password"
                inputWrapperOrder={["label", "input", "error"]}
                {...form.getInputProps("password")}
              />
              {error ? (
                <Text c={"red"} fz={"h6"}>
                  {error}
                </Text>
              ) : (
                ""
              )}
              <Button
                fullWidth
                leftSection={<IconLock size={16} />}
                mt="sm"
                type="submit"
              >
                Log in
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
