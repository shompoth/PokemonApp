import { Image, Text, TouchableOpacity, View } from "react-native";
import { RootView } from "../../components/RootView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  formatSize,
  formatWeight,
  getPokemonArtwork,
  getPokemonIdDisplay,
} from "../../functions/pokemon";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { PokemonType } from "../../components/PokemonType";
import { PokemonSpec } from "../../components/PokemonSpec";
import { PokemonStat } from "../../components/PokemonStat";

const Pokemon = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as { id: string };

  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id: params.id,
  });
  const mainType = pokemon?.types?.[0].type.name;
  const types = pokemon?.types ?? [];
  console.log(
    "species",
    species?.flavor_text_entries.find(({ language }) => language.name === "en")
      .flavor_text
  );

  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replace(/\n/g, " ")
    .replace(/\f/g, " ");

  return (
    <RootView style={{ backgroundColor: "orange" }}>
      <View style={{ position: "relative" }} className="px-4">
        <Image
          source={require("../../../assets/pokeball_big.png")}
          className="w-[50%] h-[50%] absolute right-8 top-8 bg-black"
          resizeMode="contain"
        />
        <View>
          <View className="flex-row items-center p-4 py-8">
            <TouchableOpacity onPress={() => router.back()} className="pr-4">
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold flex-1 capitalize">
              {pokemon?.name}
            </Text>
            <Text className="text-gray-500 font-bold">
              {getPokemonIdDisplay(params.id)}
            </Text>
          </View>
          <Image
            source={{
              uri: getPokemonArtwork(params.id),
            }}
            className="w-3/5 aspect-square mx-auto"
            resizeMode="contain"
          />
          <View className="flex-row justify-center">
            {types.map((type) => (
              <PokemonType key={type.type.name} name={type.type.name} />
            ))}
          </View>
          <Text className="mx-auto my-2">About</Text>
          <View className="flex-row">
            <PokemonSpec
              title={formatWeight(pokemon?.weight)}
              icon="barbell-outline"
              description="Weight"
            />
            <PokemonSpec
              title={formatSize(pokemon?.height)}
              icon="resize-outline"
              description="Size"
            />
            <PokemonSpec
              title={pokemon?.moves
                .slice(0, 2)
                .map((m) => m.move.name)
                .join("\n")}
              description="Moves"
              isLast
            />
          </View>
          <Text className="text-center my-4 font-medium">{bio}</Text>
          <Text className="mx-auto my-4">Base Stats</Text>
          <View>
            {pokemon?.stats.map((stat) => (
              <PokemonStat
                key={stat.stat.name}
                name={stat.stat.name}
                value={stat.base_stat}
                color="red"
              />
            ))}
          </View>
        </View>
      </View>
    </RootView>
  );
};

export default Pokemon;
