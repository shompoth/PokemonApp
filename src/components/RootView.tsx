import { SafeAreaView } from "react-native";
type Props = {
  children: React.ReactNode;
};

export const RootView = ({ children }: Props) => {
  return <SafeAreaView className="flex-1 pb-8">{children}</SafeAreaView>;
};
