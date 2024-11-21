import { Link } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { getPokemonArtwork, getPokemonIdDisplay } from "../functions/pokemon";
import { CustomText } from "./CustomText";

type Props = {
  name: string;
  id: number;
};

export const PokemonCard = ({ name, id }: Props) => {
  return (
    <Link
      href={{
        pathname: "/pokemon/[id]",
        params: { id },
      }}
      asChild
    >
      {/* Keep flex ? for web ? */}
      {/* <Pressable style={{ flex: 1 / 2 }} className="m-2"> */}
      <TouchableOpacity className="w-[46%] m-2">
        <View className="bg-white p-4 rounded-lg shadow relative aspect-square justify-center">
          <CustomText
            variant="small"
            className="absolute top-2 right-2 font-bold  text-gray-500"
          >
            {getPokemonIdDisplay(id.toString())}
          </CustomText>
          <Image
            source={{
              uri: getPokemonArtwork(id),
            }}
            className="w-4/5 h-4/5 mx-auto"
            resizeMode="contain"
          />
          <CustomText className="text-center font-medium mt-2 capitalize">
            {name}
          </CustomText>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
