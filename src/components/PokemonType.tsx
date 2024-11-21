import { View } from "react-native";
import { CustomText } from "./CustomText";

type Props = {
  name: string;
};

export const PokemonType = ({ name }: Props) => {
  return (
    <View className="p-2 rounded-xl bg-white my-2 mx-2">
      <CustomText className="text-gray-500 capitalize">{name}</CustomText>
    </View>
  );
};
