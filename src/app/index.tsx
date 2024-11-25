import { useState } from "react";
import { View, useWindowDimensions, ViewStyle } from "react-native";
import { SearchBar } from "../components/pokemon-search/SearchBar";
import { useInfiniteFetchQuery } from "../hooks/useFetchQuery";
import { getPokemonId } from "../functions/pokemon";
import { RootView } from "../components/common/RootView";
import { PokemonList } from "../components/pokemon-search/PokemonList";
import { Header } from "../components/pokemon-search/Header";

export default function Index() {
  const [search, setSearch] = useState("");
  const {
    data,
    isFetching,
    isLoading,
    error,
    isError,
    refetch,
    fetchNextPage,
  } = useInfiniteFetchQuery("/pokemon?limit=20");

  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 3 : 2;

  const pokemons =
    data?.pages.flatMap((page) =>
      page.results.map((r: { name: string; url: string }) => ({
        name: r.name,
        id: getPokemonId(r.url),
      }))
    ) ?? [];
  const filteredPokemons = search
    ? pokemons.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.id.toString().includes(search)
      )
    : pokemons;

  const responsiveStyle: ViewStyle = {
    width: "100%",
    maxWidth: 1200,
    marginHorizontal: width > 768 ? "auto" : undefined,
  };

  return (
    <RootView>
      <View style={responsiveStyle} className="flex-1 p-4">
        <Header width={width} />
        <SearchBar
          searchText={search}
          isEditable={!isFetching && !isError}
          onChange={setSearch}
        />
        <PokemonList
          filteredPokemons={filteredPokemons}
          numColumns={numColumns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          search={search}
          refetch={refetch}
          fetchNextPage={fetchNextPage}
        />
      </View>
    </RootView>
  );
}
