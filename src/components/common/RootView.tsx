import { SafeAreaView, ViewProps } from "react-native";
type Props = ViewProps;

export const RootView = ({ style, ...rest }: Props) => {
  return <SafeAreaView style={style} className="flex-1 pb-8" {...rest} />;
};
