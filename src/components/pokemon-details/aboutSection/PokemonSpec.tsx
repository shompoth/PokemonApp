import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { CustomText } from "@/components/common/CustomText";

type Props = {
  title?: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isLast?: boolean;
};

export const PokemonSpec = ({
  title,
  description,
  icon,
  isLast = false,
}: Props) => {
  return (
    <View
      className={`flex-1 items-center ${
        !isLast && "border-r border-r-gray-200"
      }`}
    >
      <View className="flex-row items-center justify-center h-16">
        {icon && (
          <Ionicons name={icon} size={24} color="black" className="mx-2" />
        )}
        <CustomText>{title}</CustomText>
      </View>
      <CustomText className="font-medium">{description}</CustomText>
    </View>
  );
};
