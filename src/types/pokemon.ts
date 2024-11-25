interface PokemonBase {
  name: string;
  url: string;
}

export interface PokemonBaseId {
  id: number;
  name: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBase[];
}

type FlavorTextEntry = {
  flavor_text: string;
  language: {
    name: string;
  };
};

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
}

type NamedResource = {
  name: string;
};

type MoveDetail = {
  move: NamedResource;
};

export type StatDetail = {
  base_stat: number;
  stat: NamedResource;
};

export type TypeDetail = {
  type: NamedResource;
};

export interface PokemonDetail extends PokemonBase {
  id: number;
  weight: number;
  height: number;
  moves: MoveDetail[];
  stats: StatDetail[];
  cries: {
    latest: string;
  };
  types: TypeDetail[];
}
