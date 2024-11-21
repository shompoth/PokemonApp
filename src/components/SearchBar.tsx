import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

type Props = {
  searchText: string;
  onChange: (s: string) => void;
};

const SearchBar = ({ searchText, onChange }: Props) => {
  return (
    <View className="flex-row items-center justify-center bg-white rounded-lg shadow mb-4">
      <View className="px-2">
        <Ionicons name="search" size={24} color="#71717a" />
      </View>
      <TextInput
        className="flex-1 p-3"
        value={searchText}
        onChangeText={onChange}
        placeholder="Search for a Pokemon..."
      />
    </View>
  );
};

export default SearchBar;
