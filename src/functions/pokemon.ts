export const getPokemonId = (url: string): number => {
  return parseInt(url.split("/").at(-2)!, 10);
};

export const getPokemonIdDisplay = (id: string): string => {
  return `#${id.padStart(4, "0")}`;
};

export const getPokemonArtwork = (id: number | string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const formatWeight = (weight?: number): string => {
  if (!weight) {
    return "--";
  }
  return (weight / 10).toString().replace(".", ",") + " kg";
};

export const formatSize = (size?: number): string => {
  if (!size) {
    return "--";
  }
  return (size / 10).toString().replace(".", ",") + " m";
};

export const statShortName = (name: string): string => {
  return name
    .replaceAll("special", "S")
    .replaceAll("-", "")
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("speed", "SPD")
    .toUpperCase();
};
