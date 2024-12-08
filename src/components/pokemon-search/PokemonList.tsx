import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { PokemonCard } from "./PokemonCard";
import { PokemonBaseId } from "../../types/pokemon";

type Props = {
  filteredPokemons: PokemonBaseId[];
  numColumns: number;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  search: string;
  refetch: () => void;
  fetchNextPage: () => void;
};

export const PokemonList = ({
  filteredPokemons,
  numColumns,
  isLoading,
  isFetching,
  isError,
  error,
  search,
  refetch,
  fetchNextPage,
}: Props) => {
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Loading Pokémon...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-4">
          {error?.message || "An error has occurred"}
        </Text>
        <Button onPress={() => refetch()} title="Retry" />
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      data={filteredPokemons}
      key={numColumns}
      numColumns={numColumns}
      columnWrapperStyle={{
        justifyContent: "center",
      }}
      contentContainerClassName="px-2"
      renderItem={({ item }) => <PokemonCard name={item.name} id={item.id} />}
      ListFooterComponent={
        <>
          {isFetching && <ActivityIndicator />}
          <View className="pb-2" />
        </>
      }
      onEndReached={search ? null : () => fetchNextPage()}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
