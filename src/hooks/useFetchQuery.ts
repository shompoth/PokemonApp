import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2";

export const useFetchQuery = (
  path: string,
  params?: Record<string, string | number>
) => {
  const localUrl =
    endpoint +
    Object.entries(params ?? {}).reduce(
      (acc, [key, value]) => acc.replaceAll(`[${key}]`, String(value)),
      path
    );

  return useQuery({
    queryKey: [localUrl],
    queryFn: () => {
      return fetch(localUrl, {
        headers: {
          Accept: "application/json",
        },
      }).then((r) => r.json());
    },
  });
};

export const useInfiniteFetchQuery = (path: string) => {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: ({ pageParam }) => {
      return fetch(pageParam, {
        headers: {
          Accept: "application/json",
        },
      }).then((r) => r.json());
    },
    getNextPageParam: (lastPage) => {
      if ("next" in lastPage) {
        return lastPage.next;
      }
      return null;
    },
  });
};
