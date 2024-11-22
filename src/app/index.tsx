import { useState } from "react";
import { View, FlatList, ActivityIndicator, Image } from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";
import { useInfiniteFetchQuery } from "../hooks/useFetchQuery";
import { getPokemonId } from "../functions/pokemon";
import { RootView } from "../components/RootView";
import { CustomText } from "../components/CustomText";

export default function Index() {
  const [search, setSearch] = useState("");
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery("/pokemon?limit=20");

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
      <View className="flex-1 p-4">
        <View className="flex-row mb-2 px-2 items-center">
          <Image
            source={require("../../assets/pokemon-logo.png")}
            className="h-6 w-6 mr-2"
          />
          <CustomText variant="xlarge" className="font-bold">
            Pokédex
          </CustomText>
        </View>
        <SearchBar searchText={search} onChange={setSearch} />
        <FlatList
          style={{ flex: 1 }}
          data={filteredPokemons}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "center" }}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} id={item.id} />
          )}
          ListFooterComponent={
            <>
              {isFetching && <ActivityIndicator />}
              <View className="pb-2" />
            </>
          }
          onEndReached={search ? null : () => fetchNextPage()}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </RootView>
  );
}
