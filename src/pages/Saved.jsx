import { Center, Grid, Text } from "@mantine/core";
import React from "react";
import useSavedStore from "../store/useSavedStore";
import BooksCardGrid from "../components/BookGridCard";

const Saved = () => {
  const { saved } = useSavedStore();
  return (
    <>
      {saved.length ? (
        <Grid>
          {saved.map((item) => (
            <BooksCardGrid key={item.id} {...item} />
          ))}
        </Grid>
      ) : (
        <Center mt={200}>
          <Text fz={"h1"} c="dimmed">
            You have no saved books yet
          </Text>
        </Center>
      )}
    </>
  );
};

export default Saved;
