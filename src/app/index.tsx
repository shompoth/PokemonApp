import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { Pokemon } from "../types/pokemon";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [searchText, setSearchText] = useState("");

  const data = [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    },
    {
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/",
    },
    {
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/",
    },
  ];

  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <View className="flex-row items-center justify-center bg-white rounded-lg shadow p-2 mb-4">
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
          renderItem={({ item }: { item: Pokemon }) => (
            <Link
              href={{
                pathname: "/pokemon/[id]",
                params: { id: item.name },
              }}
              asChild
            >
              <Pressable className="flex-1 m-2">
                <View className="bg-white p-4 rounded-lg shadow relative">
                  <Image
                    source={{ uri: item.url }}
                    className="w-24 h-24 mx-auto"
                  />
                  <Text className="text-center font-medium capitalize mt-2">
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  );
}
