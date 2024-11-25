import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { CustomText } from "../common/CustomText";
import { getPokemonIdDisplay } from "../../functions/pokemon";
import { useRouter } from "expo-router";

type Props = {
  name?: string;
  id: string;
  width: number;
};

export const Header = ({ name, id, width }: Props) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center p-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="pr-4"
        hitSlop={20}
      >
        <Ionicons
          name="arrow-back"
          size={width > 768 ? 32 : 24}
          color="black"
        />
      </TouchableOpacity>
      <CustomText
        variant={width > 768 ? "large" : "large"}
        className="font-bold flex-1 capitalize"
      >
        {name}
      </CustomText>
      <CustomText className="text-gray-500 font-bold">
        {getPokemonIdDisplay(id)}
      </CustomText>
    </View>
  );
};
