import { useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";
import { useInfiniteFetchQuery } from "../hooks/useFetchQuery";
import { getPokemonId } from "../functions/pokemon";
import { RootView } from "../components/RootView";

export default function Index() {
  const [search, setSearch] = useState("");

  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery("/pokemon?limit=21");

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
          p.id.toString() === search
      )
    : pokemons;

  return (
    <RootView>
      <View className="p-4">
        <SearchBar searchText={search} onChange={setSearch} />
        <FlatList
          data={filteredPokemons}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} id={item.id} />
          )}
          ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
          onEndReached={search ? null : () => fetchNextPage()}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </RootView>
  );
}
