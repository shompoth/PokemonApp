import { ScrollView, useWindowDimensions, View, ViewStyle } from "react-native";
import { RootView } from "@/components/common/RootView";
import { useLocalSearchParams } from "expo-router";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { basePokemonStats } from "@/constants/pokemon";
import { Header } from "@/components/pokemon-details/Header";
import { ImageSection } from "@/components/pokemon-details/imageSection";
import { AboutSection } from "@/components/pokemon-details/aboutSection";
import { StatsSection } from "@/components/pokemon-details/statsSection";

const Pokemon = () => {
  const params = useLocalSearchParams() as { id: string };

  const { height, width } = useWindowDimensions();
  const isSmallDevice = height <= 720;

  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id: params.id,
  });
  // const mainType = pokemon?.types?.[0].type.name;
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
    <RootView>
      <View style={responsiveStyle} className="px-4 flex-1">
        <Header name={pokemon?.name} id={params.id} width={width} />
        <ScrollView>
          <View className={`${width > 1024 ? "flex-row" : "flex-col"}`}>
            <ImageSection
              types={types}
              width={width}
              id={params.id}
              isSmallDevice={isSmallDevice}
            />
            <AboutSection pokemon={pokemon} bio={bio} width={width} />
            <StatsSection stats={stats} width={width} />
          </View>
        </ScrollView>
      </View>
    </RootView>
  );
};

export default Pokemon;
