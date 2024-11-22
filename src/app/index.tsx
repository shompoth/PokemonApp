import { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
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
          p.id.toString() === search
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
        <View className="flex-row mb-2 px-2 items-center">
          <Image
            source={require("../../assets/pokemon-logo.png")}
            style={{ width: width * 0.05, height: width * 0.05 }}
            className="mr-2"
            resizeMode="contain"
          />
          <CustomText variant="xlarge" className="font-bold">
            Pokédex
          </CustomText>
        </View>
        <SearchBar searchText={search} onChange={setSearch} />
        <FlatList
          style={{ flex: 1 }}
          data={filteredPokemons}
          key={numColumns}
          numColumns={numColumns}
          columnWrapperStyle={{
            justifyContent: "center",
          }}
          contentContainerClassName="px-2"
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
