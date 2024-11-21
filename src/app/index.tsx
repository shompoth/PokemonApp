import { useState } from "react";
import { View, TextInput, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PokemonCard from "../components/PokemonCard";
import { useFetchQuery, useInfiniteFetchQuery } from "../hooks/useFetchQuery";
import { getPokemonId } from "../functions/pokemon";

export default function Index() {
  const [searchText, setSearchText] = useState("");

  // const { data, isFetching } = useFetchQuery("/pokemon?limit=21");
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery("/pokemon?limit=21");
  // const pokemons = data?.results ?? [];
  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <SafeAreaView className="flex-1 pb-8">
      <View className="p-4">
        <View className="flex-row items-center justify-center bg-white rounded-lg shadow mb-4">
          <View className="px-2">
            <Ionicons name="search" size={24} color="#71717a" />
          </View>
          <TextInput
            className="flex-1 p-2"
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Rechercher un Pokémon..."
          />
        </View>
        <FlatList
          data={pokemons}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} id={getPokemonId(item.url)} />
          )}
          ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
          onEndReached={() => fetchNextPage()}
          keyExtractor={(item) => item.url}
        />
      </View>
    </SafeAreaView>
  );
}
