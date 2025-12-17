import { Box, Flex } from "@mantine/core";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";

const Layout = () => {
  return (
    <>
      <Header />
      <Flex>
        <Aside />
        <Box w="25%" />
        <Outlet />
      </Flex>
    </>
  );
};

export default Layout;
