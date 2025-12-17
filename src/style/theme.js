import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  other: {
    mainText: {
      light: "black",
      dark: "white",
    },
    mainBg: {
      light: "E1DBCB",
      dark: "090F15",
    },
    box1: {
      light: "#C5BEAB",
      dark: "#B3B7BA",
    },
    box2: {
      light: "#9CA089",
      dark: "6C6D74",
    },
    box3: {
      light: "#868B6B",
      dark: "#262E36",
    },
    box4: {
      light: "#5D624C",
      dark: "#D3D1CE",
    },
  },
});

export default theme;
