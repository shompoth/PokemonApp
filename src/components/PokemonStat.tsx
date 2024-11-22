import { ViewProps } from "react-native";
import { View } from "react-native";
import { statShortName } from "../functions/pokemon";
import { CustomText } from "./CustomText";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";

type Props = ViewProps & {
  name: string;
  value: number;
};

export const PokemonStat = ({ name, value }: Props) => {
  const max = 255;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value / max,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <View className="flex-row items-center">
      <View className="items-center py-1 border-r-2 border-r-gray-300 w-16">
        <CustomText>{statShortName(name)}</CustomText>
      </View>
      <View className="py-1 items-center w-16">
        <CustomText>{value.toString().padStart(3, "0")}</CustomText>
      </View>
      <View className="flex-1 rounded h-2 md:h-3 overflow-hidden bg-orange-500/20">
        <Animated.View
          style={{
            transform: [{ scaleX: animatedValue }],
            backgroundColor: "rgb(249 115 22)",
            height: "100%",
            width: "100%",
            transformOrigin: "left",
          }}
        />
      </View>
    </View>
  );
};
