import { Image, View } from "react-native";
import { CustomText } from "../common/CustomText";

export const Header = ({ width }: { width: number }) => {
  return (
    <View className="flex-row mb-2 px-2 items-center">
      <Image
        source={require("../../../assets/pokemon-logo.png")}
        style={{ width: width * 0.05, height: width * 0.05 }}
        className="mr-2"
        resizeMode="contain"
      />
      <CustomText variant="xlarge" className="font-bold">
        Pokédex
      </CustomText>
    </View>
  );
};
