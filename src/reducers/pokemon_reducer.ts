import { Pokemon_Action } from "../action_interfaces/pokemon_interface";
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

interface I_initial_state {
  loading_pokemon_list: boolean;
  loading_pokemon_stats: boolean;
  pokemon_list: (I_pokemon | undefined)[] | null;
}

const initial_state: I_initial_state = {
  loading_pokemon_list: true,
  loading_pokemon_stats: true,
  pokemon_list: null,
};

export default function (
  state: I_initial_state = initial_state,
  action: Pokemon_Action
): I_initial_state {
  switch (action.type) {
    case Action_Type.GET_POKEMON_LIST:
      return {
        ...state,
        loading_pokemon_list: false,
        pokemon_list: action.payload.pokemon_list,
      };
    case Action_Type.GET_POKEMON_STATS_LIST:
      return {
        ...state,
        loading_pokemon_stats: false,
        pokemon_list: action.payload.pokemon_list,
      };
    // case Action_Type.NEW_GAME:
    //   return initial_state;

    // case Action_Type.TOGGLE_PLAYER:
    //   return {
    //     ...state,
    //     current_player: action.current_player,
    //     board: action.board,
    //   };

    // case Action_Type.UPDATE_MESSAGE:
    //   return {
    //     ...state,
    //     message: action.message,
    //   };

    // case Action_Type.END_GAME:
    //   return {
    //     ...state,
    //     game_over: true,
    //     message: action.message,
    //     board: action.board,
    //   };
    default:
      return state;
  }
}
