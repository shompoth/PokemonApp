import { ViewProps } from "react-native";
import { View } from "react-native";
import { statShortName } from "../functions/pokemon";
import { CustomText } from "./CustomText";

type Props = ViewProps & {
  name: string;
  value: number;
};

export const PokemonStat = ({ name, value }: Props) => {
  const max = 255;

  return (
    <View className="flex-row items-center">
      <View className="items-center py-1 border-r-2 border-r-gray-300 w-16">
        <CustomText>{statShortName(name)}</CustomText>
      </View>
      <View className="py-1 items-center w-16">
        <CustomText>{value.toString().padStart(3, "0")}</CustomText>
      </View>
      <View className="flex-1 rounded h-2 md:h-3 overflow-hidden flex-row">
        <View style={{ flex: value }} className="bg-orange-500"></View>
        <View
          style={{ flex: max - value }}
          className="bg-orange-500 opacity-20"
        />
      </View>
    </View>
  );
};
