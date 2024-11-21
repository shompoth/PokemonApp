import { Text, ViewProps } from "react-native";
import { View } from "react-native";
import { statShortName } from "../functions/pokemon";

type Props = ViewProps & {
  name: string;
  value: number;
  color: string;
};

export const PokemonStat = ({ name, value }: Props) => {
  const max = 255;

  return (
    <View className="flex-row items-center">
      <View className="items-center w-16 py-1 border-r-2 border-r-gray-300">
        <Text>{statShortName(name)}</Text>
      </View>
      <View className="w-16 py-1 items-center">
        <Text>{value.toString().padStart(3, "0")}</Text>
      </View>
      <View className="flex-1 rounded h-2 overflow-hidden flex-row ml-auto">
        <View style={{ flex: value }} className="bg-orange-500"></View>
        <View
          style={{ flex: max - value }}
          className="bg-orange-500 opacity-20"
        ></View>
      </View>
    </View>
  );
};
