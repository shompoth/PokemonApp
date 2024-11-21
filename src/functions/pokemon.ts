export const getPokemonId = (url: string): number => {
  return parseInt(url.split("/").at(-2)!, 10);
};

export const getPokemonIdDisplay = (id: string): string => {
  return `#${id.padStart(4, "0")}`;
};
