import {
  Box,
  Flex,
  Stack,
  Text,
  useMantineTheme,
  useMantineColorScheme,
  Divider,
  Button,
} from "@mantine/core";
import {
  IconBook,
  IconBooks,
  IconLayoutDashboardFilled,
  IconLogout,
  IconMessage,
  IconNote,
  IconPin,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const menuItems = [
  { icon: IconLayoutDashboardFilled, label: "Dashboard", to: "/" },
  { icon: IconBooks, label: "Libraries", to: "/libraries" },
  { icon: IconBook, label: "Books", to: "/books" },
  { icon: IconMessage, label: "Messages", to: "/messages" },
  { icon: IconNote, label: "Notes", to: "/notes" },
  { icon: IconPin, label: "Saved", to: "/saved" },
  { icon: IconSettings, label: "Settings", to: "/settings" },
];

const Aside = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { logOut, admin } = useAuthStore();

  return (
    <Box
      w="20%"
      h="100vh"
      pos={"fixed"}
      style={{
        backgroundColor: `${theme.other.box2[colorScheme]}`,
        borderRadius: "0 40px 40px 0",
        padding: "0px 50px",
      }}
    >
      <Flex
        mb={20}
        mt={100}
        gap={10}
        align={"center"}
        component={Link}
        to={"/settings"}
        c={theme.other.mainText[colorScheme]}
      >
        <IconUserCircle color={theme.other.mainText[colorScheme]} size={40} />
        <Text fz={20}>{admin?.name}</Text>
      </Flex>
      <Divider mb={40} bg={"gray"} />
      <Stack gap={20}>
        {menuItems?.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  style={({ isActive }) => ({
                    color: theme.other.mainText[colorScheme],
                    textDecoration: "none",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "30px",
                    borderRadius: "40px",
                    gap: "10px",
                    width: "280px",
                    paddingBlock: "10px",
                    backgroundColor: isActive
                      ? colorScheme === "light"
                        ? "white"
                        : theme.colors.dark[7]
                      : "",
                  })}
                >
                  <Icon color={theme.other.mainText[colorScheme]} />
                  {item.label}
                </NavLink>
              ) : (
                ""
              )}
            </div>
          );
        })}
        <Button
          mt={60}
          bg={theme.other.box2[colorScheme]}
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
          onClick={() => logOut()}
        >
          <IconLogout /> <Text>Log Out</Text>
        </Button>
      </Stack>
    </Box>
  );
};

export default Aside;
