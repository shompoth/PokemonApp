import { Image, View } from "react-native";
import { getPokemonArtwork } from "@/functions/pokemon";
import { TypeDetail } from "@/types/pokemon";
import { PokemonType } from "./PokemonType";

type Props = {
  width: number;
  id: string;
  isSmallDevice: boolean;
  types: TypeDetail[];
};

export const ImageSection = ({ types, width, id, isSmallDevice }: Props) => {
  return (
    <View className={`${width > 1024 ? "w-1/3" : "w-full"}`}>
      <Image
        source={{ uri: getPokemonArtwork(id) }}
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
  );
};
