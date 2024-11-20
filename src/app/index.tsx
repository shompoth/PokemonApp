import { View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Hello</Text>
      <Link href={{ pathname: "/pokemon/[id]", params: { id: 3 } }}>
        <View className="bg-gray-300">
          <Text className="text-3xl text-gray-700">click</Text>
        </View>
      </Link>
    </SafeAreaView>
  );
};

export default Index;
