import { View, Text } from "react-native";

type Props = {
  name: string;
};

export const PokemonType = ({ name }: Props) => {
  return (
    <View className="p-2 rounded-xl bg-white my-2 mx-2">
      <Text className="text-gray-500 capitalize">{name}</Text>
    </View>
  );
};
