import { Button, Flex, Text, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Flex>
      <Text></Text>
      <Flex>
        <Button onClick={toggleColorScheme}>
          {colorScheme === "light" ? <IconMoon /> : <IconSun />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
