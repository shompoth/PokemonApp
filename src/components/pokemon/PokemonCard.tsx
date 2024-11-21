import { Link } from "expo-router";
import { View, Image, Pressable, Text } from "react-native";

type Props = {
  name: string;
  id: number;
};

const PokemonCard = ({ name, id }: Props) => {
  return (
    <Link
      href={{
        pathname: "/pokemon/[id]",
        params: { id: name },
      }}
      asChild
    >
      <Pressable style={{ flex: 1 / 2 }} className="m-2">
        <View className="bg-white p-4 rounded-lg shadow relative aspect-square justify-center">
          <Text className="absolute top-2 right-2 font-bold text-xs text-gray-500">
            #{String(id).padStart(4, "0")}
          </Text>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }}
            style={{
              width: "80%",
              height: "80%",
            }}
            className="mx-auto"
            resizeMode="contain"
          />
          <Text className="text-center font-medium mt-2">{name}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default PokemonCard;
