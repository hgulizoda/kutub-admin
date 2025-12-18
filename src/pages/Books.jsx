import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Pagination } from "@mantine/core";
import API from "../api/api";
import BooksCardGrid from "../components/BookGridCard";

const Books = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");
      return res.data;
    },
  });

  const paginatedBooks = books?.slice(start, end);

  return (
    <>
      <Grid style={{ justifySelf: "center" }}>
        {paginatedBooks?.map((book) => (
          <Grid.Col span={2.7} key={book.id}>
            <BooksCardGrid {...book} />
          </Grid.Col>
        ))}
      </Grid>

      <Pagination
        mt="md"
        mb={50}
        style={{ justifySelf: "center" }}
        page={page}
        onChange={setPage}
        total={Math.ceil(books.length / limit)}
      />
    </>
  );
};

export default Books;
