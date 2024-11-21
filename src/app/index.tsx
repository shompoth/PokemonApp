import { useState } from "react";
import { View, TextInput, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PokemonCard from "../components/PokemonCard";
import { useFetchQuery, useInfiniteFetchQuery } from "../hooks/useFetchQuery";
import { getPokemonId } from "../functions/pokemon";
import SearchBar from "../components/SearchBar";

export default function Index() {
  const [search, setSearch] = useState("");

  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery("/pokemon?limit=21");

  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];
  const filteredPokemons = search
    ? pokemons.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          getPokemonId(p.url).toString() === search
      )
    : pokemons;

  return (
    <SafeAreaView className="flex-1 pb-8">
      <View className="p-4">
        <SearchBar searchText={search} onChange={setSearch} />
        <FlatList
          data={filteredPokemons}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} id={getPokemonId(item.url)} />
          )}
          ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
          onEndReached={search ? null : () => fetchNextPage()}
          keyExtractor={(item) => item.url}
        />
      </View>
    </SafeAreaView>
  );
}
