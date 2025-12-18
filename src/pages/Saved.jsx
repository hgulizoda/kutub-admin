import { Grid } from "@mantine/core";
import React from "react";
import useSavedStore from "../store/useSavedStore";
import BooksCardGrid from "../components/BookGridCard";

const Saved = () => {
  const { saved } = useSavedStore();
  return (
    <>
      <Grid>
        {saved.map((item) => (
          <BooksCardGrid key={item.id} {...item} />
        ))}
      </Grid>
    </>
  );
};

export default Saved;
