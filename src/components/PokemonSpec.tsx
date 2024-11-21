import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

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
        <Text>{title}</Text>
      </View>
      <Text className="mt-2">{description}</Text>
    </View>
  );
};
