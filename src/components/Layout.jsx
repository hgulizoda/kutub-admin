import { Box, Container, Flex } from "@mantine/core";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";

const Layout = () => {
  return (
    <>
      <Header />
      <Flex gap={40}>
        <Aside />
        <Box w="20%" />
        <Box w="80%" style={{ justifySelf: "end" }} mt={100}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
