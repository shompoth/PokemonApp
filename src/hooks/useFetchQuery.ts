import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  PokemonDetail,
  PokemonListResponse,
  PokemonSpecies,
} from "../types/pokemon";

const endpoint = "https://pokeapi.co/api/v2";

type API = {
  "/pokemon?limit=20": PokemonListResponse;
  "/pokemon/[id]": PokemonDetail;
  "/pokemon-species/[id]": PokemonSpecies;
};

type QueryPath = keyof API;
type QueryParams = Record<string, string | number>;

export const useFetchQuery = <T extends QueryPath>(
  path: T,
  params?: QueryParams
) => {
  const localUrl =
    endpoint +
    Object.entries(params ?? {}).reduce<string>(
      (acc, [key, value]) => acc.replaceAll(`[${key}]`, String(value)),
      path
    );

  return useQuery({
    queryKey: [localUrl],
    queryFn: () =>
      fetch(localUrl, {
        headers: { Accept: "application/json" },
      }).then((r) => r.json() as Promise<API[T]>),
  });
};

export const useInfiniteFetchQuery = <T extends QueryPath>(path: T) => {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: ({ pageParam }) =>
      fetch(pageParam, {
        headers: { Accept: "application/json" },
      }).then((r) => r.json() as Promise<API[T]>),
    getNextPageParam: (lastPage) => {
      return "next" in lastPage ? lastPage.next : null;
    },
  });
};
