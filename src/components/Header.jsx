import {
  Button,
  Flex,
  Select,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconLanguage, IconMoon, IconSun } from "@tabler/icons-react";
import { useState } from "react";

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [language, setLanguage] = useState("en");
  return (
    <Flex
      pos={"absolute"}
      justify={"space-between"}
      w={"80%"}
      style={{ justifySelf: "end" }}
      py={"md"}
      px={"xl"}
    >
      <Text fz={"h2"}>Admin</Text>
      <Flex gap={20}>
        <Select
          placeholder="Select language"
          leftSection={<IconLanguage size={16} />}
          value={language}
          onChange={setLanguage}
          data={[
            { value: "en", label: "English" },
            { value: "uz", label: "O‘zbek" },
          ]}
          radius="md"
          w={150}
        />
        <Flex>
          <Button onClick={toggleColorScheme}>
            {colorScheme === "light" ? <IconMoon /> : <IconSun />}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
