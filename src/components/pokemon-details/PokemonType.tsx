import { View } from "react-native";
import { CustomText } from "../common/CustomText";

type Props = {
  name: string;
};

export const PokemonType = ({ name }: Props) => {
  return (
    <View className="p-2 m-2 rounded-xl bg-white">
      <CustomText className="text-gray-500 capitalize font-semibold">
        {name}
      </CustomText>
    </View>
  );
};
