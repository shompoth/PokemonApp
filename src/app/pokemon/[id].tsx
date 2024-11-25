import {
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { RootView } from "../../components/common/RootView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  formatSize,
  formatWeight,
  getPokemonArtwork,
  getPokemonIdDisplay,
} from "../../functions/pokemon";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { PokemonType } from "../../components/pokemon-details/PokemonType";
import { PokemonSpec } from "../../components/pokemon-details/PokemonSpec";
import { PokemonStat } from "../../components/pokemon-details/PokemonStat";
import { CustomText } from "../../components/common/CustomText";
import { basePokemonStats } from "../../constants/pokemon";

const Pokemon = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as { id: string };

  const { height, width } = useWindowDimensions();
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

  const responsiveStyle: ViewStyle = {
    width: "100%",
    marginHorizontal: width > 768 ? "auto" : undefined,
  };

  const stats = pokemon?.stats ?? basePokemonStats;

  return (
    <RootView style={{}}>
      <View style={responsiveStyle} className="px-4 flex-1">
        <View className="flex-row items-center p-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="pr-4"
            hitSlop={20}
          >
            <Ionicons
              name="arrow-back"
              size={width > 768 ? 32 : 24}
              color="black"
            />
          </TouchableOpacity>
          <CustomText
            variant={width > 768 ? "large" : "large"}
            className="font-bold flex-1 capitalize"
          >
            {pokemon?.name}
          </CustomText>
          <CustomText className="text-gray-500 font-bold">
            {getPokemonIdDisplay(params.id)}
          </CustomText>
        </View>

        <ScrollView>
          <View className={`${width > 1024 ? "flex-row" : "flex-col"}`}>
            <View className={`${width > 1024 ? "w-1/3" : "w-full"}`}>
              <Image
                source={{ uri: getPokemonArtwork(params.id) }}
                className={`aspect-square mx-auto ${
                  width > 1024
                    ? "w-full"
                    : width > 768
                    ? "w-2/5"
                    : isSmallDevice
                    ? "w-1/3"
                    : "w-1/2"
                }`}
                resizeMode="contain"
              />
              <View className="flex-row justify-center m-4">
                {!!types?.length ? (
                  types.map((type) => (
                    <PokemonType key={type.type.name} name={type.type.name} />
                  ))
                ) : (
                  <View className="h-10 w-10 p-2 m-2" />
                )}
              </View>
            </View>

            <View className={`${width > 1024 ? "w-1/3 px-8" : "w-full"}`}>
              <CustomText
                className={`text-center font-semibold ${
                  width > 1024 ? "mb-8" : "mb-0"
                }`}
              >
                About
              </CustomText>
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
                    .slice(0, 1)
                    .map((m) => m.move.name)
                    .join("\n")}
                  description="Move"
                  isLast
                />
              </View>
              <View>
                {bio ? (
                  <CustomText
                    variant="medium"
                    className="text-center my-8 font-medium"
                  >
                    {bio}
                  </CustomText>
                ) : (
                  <View className="h-10 my-8" />
                )}
              </View>
            </View>

            <View className={`${width > 1024 ? "w-1/3 px-8" : "w-full"}`}>
              <CustomText
                className={`text-center font-semibold ${
                  width > 1024 ? "mb-8" : "mb-0"
                }`}
              >
                Base Stats
              </CustomText>
              {stats.map((stat) => (
                <PokemonStat
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </RootView>
  );
};

export default Pokemon;
