import { Text } from "react-native";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "small" | "default" | "large" | "xlarge";
};

export const CustomText = ({
  children,
  className = "",
  variant = "default",
}: Props) => {
  const variants = {
    small: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl",
    default:
      "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
    large:
      "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl",
    xlarge:
      "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
  };

  return (
    <Text className={`${variants[variant]} ${className}`}>{children}</Text>
  );
};
