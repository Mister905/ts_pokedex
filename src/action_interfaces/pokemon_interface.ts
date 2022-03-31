import { Action_Type } from "../action_types";

interface I_pokemon {
  id: number;
  name: string;
  url: string;
  stats: [];
  types: [];
  weight: number;
  image: string;
}

interface I_get_pokemon_list_payload {
  pokemon_list: I_pokemon[];
}

interface I_get_pokemon_list {
  type: Action_Type.GET_POKEMON_LIST;
  payload: I_get_pokemon_list_payload;
}

interface I_get_pokemon_stats_list_payload {
  pokemon_list: (I_pokemon | undefined )[];
}

interface I_get_pokemon_stats_list {
  type: Action_Type.GET_POKEMON_STATS_LIST;
  payload: I_get_pokemon_stats_list_payload;
}

export type Pokemon_Action = I_get_pokemon_list | I_get_pokemon_stats_list;
