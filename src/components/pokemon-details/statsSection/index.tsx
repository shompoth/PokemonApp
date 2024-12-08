import { View } from "react-native";
import { CustomText } from "../../common/CustomText";
import { PokemonStat } from "./PokemonStat";
import { StatDetail } from "../../../types/pokemon";

type Props = {
  stats: StatDetail[];
  width: number;
};

export const StatsSection = ({ stats, width }: Props) => {
  return (
    <View className={`${width > 1024 ? "w-1/3 px-8" : "w-full"}`}>
      <CustomText
        className={`text-center font-semibold ${
          width > 1024 ? "mb-8" : "mb-0"
        }`}
      >
        Base Stats
      </CustomText>
      {stats.map((stat) => (
        <PokemonStat
          key={stat.stat.name}
          name={stat.stat.name}
          value={stat.base_stat}
        />
      ))}
    </View>
  );
};
