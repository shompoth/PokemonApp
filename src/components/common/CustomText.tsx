import { Text } from "react-native";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "small" | "medium" | "default" | "large" | "xlarge";
};

export const CustomText = ({
  children,
  className = "",
  variant = "default",
}: Props) => {
  const variants = {
    small: "text-xs md:text-sm lg:text-base xl:text-lg",
    medium: "text-sm md:text-base lg:text-lg xl:text-xl",
    default: "text-base md:text-lg lg:text-xl xl:text-2xl",
    large: "text-lg md:text-xl lg:text-2xl xl:text-3xl",
    xlarge: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",
  };

  return (
    <Text className={`${variants[variant]} ${className}`}>{children}</Text>
  );
};
