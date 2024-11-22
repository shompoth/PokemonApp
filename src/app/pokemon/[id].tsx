import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
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
import { CustomText } from "../../components/CustomText";

const Pokemon = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as { id: string };

  const { height } = useWindowDimensions();
  const isSmallDevice = height <= 720;

  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id: params.id,
  });
  const mainType = pokemon?.types?.[0].type.name;
  const types = pokemon?.types ?? [];

  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replace(/\n/g, " ")
    .replace(/\f/g, " ");

  return (
    <RootView style={{}}>
      <View style={{ position: "relative" }} className="px-4">
        <View>
          <View className="flex-row items-center p-4 py-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="pr-4"
              hitSlop={20}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <CustomText
              variant="xlarge"
              className="text-2xl font-bold flex-1 capitalize"
            >
              {pokemon?.name}
            </CustomText>
            <CustomText className="text-gray-500 font-bold">
              {getPokemonIdDisplay(params.id)}
            </CustomText>
          </View>
          <Image
            source={{
              uri: getPokemonArtwork(params.id),
            }}
            className={`aspect-square mx-auto ${
              isSmallDevice ? "w-1/3" : "w-1/2"
            }`}
            resizeMode="contain"
          />
          <View className="flex-row justify-center">
            {!!types?.length ? (
              types.map((type) => (
                <PokemonType key={type.type.name} name={type.type.name} />
              ))
            ) : (
              <View className="h-10 w-10 p-2 m-2" />
            )}
          </View>
          <CustomText className="mx-auto mt-2 font-semibold">About</CustomText>
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
          <CustomText variant="medium" className="text-center my-8 font-medium">
            {bio}
          </CustomText>
          <CustomText className="mx-auto mb-2 font-semibold">
            Base Stats
          </CustomText>
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
