import { View } from "react-native";
import { CustomText } from "@/components/common/CustomText";
import { PokemonSpec } from "./PokemonSpec";
import { formatSize, formatWeight } from "@/functions/pokemon";
import { PokemonDetail } from "@/types/pokemon";

type Props = {
  pokemon: PokemonDetail | undefined;
  bio?: string;
  width: number;
};

export const AboutSection = ({ pokemon, bio, width }: Props) => {
  return (
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
          <CustomText variant="medium" className="text-center my-8 font-medium">
            {bio}
          </CustomText>
        ) : (
          <View className="h-10 my-8" />
        )}
      </View>
    </View>
  );
};
