import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Text,
  TextInput,
  Button,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
  Select,
  Group,
  Switch,
  Flex,
} from "@mantine/core";
import useAuthStore from "../store/useAuthStore";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import API from "../api/api";
import queryClient from "../api/query";

const ContactForm = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { admin, setAdmin } = useAuthStore();
  console.log(admin);

  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (admin) {
      form.setValues({
        name: admin.name || "",
        phone: admin.phone || "",
      });
    }
  }, [admin]);

  const mutation = useMutation({
    mutationFn: async (body) => {
      return await API.patch("/auth/admin/profile/", body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["admin"]);
      setAdmin(data.data);
      console.log(data);

      console.log("hooray");
    },
  });

  return (
    <Container
      size={"80%"}
      my={80}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Paper
        radius="lg"
        p="50px"
        shadow="xl"
        w={"60%"}
        style={{
          background: theme.other.box1[colorScheme],
        }}
      >
        <Stack
          gap="md"
          component="form"
          onSubmit={form.onSubmit((values) => {
            mutation.mutate(values);
          })}
        >
          <Text ta="center" size="xl" fw={700}>
            Edit Prodile
          </Text>

          <Text ta="center" size="sm" c={"white"}>
            Enter your details below
          </Text>

          <TextInput
            label="Name"
            placeholder="John Doe"
            radius="md"
            size="md"
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Phone"
            placeholder="+998 90 123 45 67"
            radius="md"
            size="md"
            {...form.getInputProps("phone")}
          />

          <Button
            size="md"
            radius="md"
            mt="sm"
            type="submit"
            style={{ backgroundColor: theme.other.box4[colorScheme] }}
          >
            Save
          </Button>
        </Stack>
      </Paper>
      {/* <Paper radius="lg" p="xl" shadow="xl" w={"50%"}>
          <Stack gap="md">
            <Text ta="center" size="xl" fw={700}>
              Settings
            </Text>

            <Text ta="center" size="sm" c="dimmed">
              Customize language and appearance
            </Text>

            <Select
              label="Language"
              placeholder="Select language"
              data={[
                { value: "en", label: "English" },
                { value: "uz", label: "Uzbek" },
                { value: "ru", label: "Russian" },
              ]}
              radius="md"
              size="md"
            />

            <Group justify="space-between" mt="sm">
              <Text size="sm">Dark Theme</Text>
              <Switch size="md" />
            </Group>

            <Button size="md" radius="md" mt="md">
              Save Settings
            </Button>
          </Stack>
        </Paper> */}
      {/* </Flex> */}
    </Container>
  );
};

export default ContactForm;
