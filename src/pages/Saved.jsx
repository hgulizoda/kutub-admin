import { Center, Grid, Text } from "@mantine/core";
import React from "react";
import useSavedStore from "../store/useSavedStore";
import BooksCardGrid from "../components/BookGridCard";
import { useTranslation } from "react-i18next";

const Saved = () => {
  const { saved } = useSavedStore();
  const { t } = useTranslation();
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
            {t("other.noData")}
          </Text>
        </Center>
      )}
    </>
  );
};

export default Saved;
