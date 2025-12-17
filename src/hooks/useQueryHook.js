import { useQuery } from "@tanstack/react-query";
import API from "../api/api";

function useQueryHook(link, key) {
  const { data } = useQuery({
    queryKey: [` ${key} `],
    queryFn: async () => {
      const res = API.get(link);
      return res.data;
    },
  });
  return data;
}

export default useQueryHook;
