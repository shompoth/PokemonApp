import { Link } from "expo-router";
import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  getPokemonArtwork,
  getPokemonIdDisplay,
} from "../../functions/pokemon";
import { CustomText } from "../common/CustomText";

type Props = {
  name: string;
  id: number;
};

export const PokemonCard = ({ name, id }: Props) => {
  const { width } = useWindowDimensions();
  const cardWidth = width > 768 ? "w-[31%]" : "w-[46%]";

  return (
    <Link
      href={{
        pathname: "/pokemon/[id]",
        params: { id },
      }}
      asChild
    >
      <TouchableOpacity className={`${cardWidth} m-2`}>
        <View className="bg-white p-4 rounded-lg shadow relative aspect-square justify-center">
          <CustomText
            variant="small"
            className="absolute top-2 right-2 font-bold text-gray-500"
          >
            {getPokemonIdDisplay(id.toString())}
          </CustomText>
          <Image
            source={{
              uri: getPokemonArtwork(id),
            }}
            className="w-4/5 h-4/5 mx-auto md:w-3/4 md:h-3/4 lg:w-2/3 lg:h-2/3"
            resizeMode="contain"
          />
          <CustomText className="text-center font-medium mt-2 capitalize">
            {name}
          </CustomText>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
