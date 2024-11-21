import { useState } from "react";
import { View, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PokemonCard from "../components/pokemon/PokemonCard";

export default function Index() {
  const [searchText, setSearchText] = useState("");

  const data = Array.from({ length: 35 }, (v, k) => ({
    id: k + 1,
    name: `Pokemon ${k}`,
  }));

  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
          data={filteredData}
          numColumns={2}
          className="gap-2"
          renderItem={({ item }) => (
            <PokemonCard name={item.name} id={item.id} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
