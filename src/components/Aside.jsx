import { Box, Flex, Stack, Text } from "@mantine/core";
import {
  IconBook,
  IconBooks,
  IconChartBar,
  IconLayoutDashboardFilled,
  IconLogout,
  IconMessage,
  IconNote,
  IconPin,
  IconSettings,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <>
      <Box w="25%" h="100%">
        <Stack>
          <Flex>
            <IconLayoutDashboardFilled />
            <NavLink to={"/"}>Dashboard</NavLink>
          </Flex>
          <Flex>
            <IconBooks />
            <NavLink to={"/libraries"}>Libraries</NavLink>
          </Flex>
          <Flex>
            <IconBook />
            <NavLink to={"/books"}>Books</NavLink>
          </Flex>
          <Flex>
            <IconMessage />
            <NavLink to={"/messages"}>Messages</NavLink>
          </Flex>
          <Flex>
            <IconNote />
            <NavLink to={"/notes"}>Notes</NavLink>
          </Flex>
          <Flex>
            <IconPin />
            <NavLink to={"/saved"}>Saved</NavLink>
          </Flex>
          <Flex>
            <IconChartBar />
            <NavLink to={"/statistics"}>Statistics</NavLink>
          </Flex>
          <Flex>
            <IconSettings />
            <NavLink to={"/settings"}>Settings</NavLink>
          </Flex>

          <Flex>
            <IconLogout />
            <Text>Log Out</Text>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default Aside;
