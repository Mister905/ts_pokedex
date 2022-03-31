import { Dispatch } from "redux";
import { Pokemon_Action } from "../action_interfaces/pokemon_interface";
import { Action_Type } from "../action_types";
import { History } from "history";
import axios from "axios";

interface I_pokemon {
  id: number;
  name: string;
  url: string;
  stats: [];
  types: [];
  weight: number;
  image: string;
}

export const get_pokemon_list =
  () => async (dispatch: Dispatch<Pokemon_Action>) => {
    try {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      dispatch({
        type: Action_Type.GET_POKEMON_LIST,
        payload: { pokemon_list: res.data.results },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const get_pokemon_stats =
  (pokemon_list: (I_pokemon | undefined)[] | null) =>
  async (dispatch: Dispatch<Pokemon_Action>) => {
   
    let pokemon_stats_list = await Promise.all(
      pokemon_list!.map(async (pokemon, i) => {
        try {
          const res = await axios.get(`${pokemon!.url}`);

          pokemon!.id = res.data.id;

          pokemon!.image = res.data.sprites.front_default;

          pokemon!.stats = res.data.stats;

          pokemon!.types = res.data.types;

          pokemon!.weight = res.data.weight;

          return pokemon;
        } catch (error) {
          console.log(error);
        }
      })
    );

    dispatch({
      type: Action_Type.GET_POKEMON_STATS_LIST,
      payload: { pokemon_list: pokemon_stats_list },
    });

    

    // console.log(pokemon_list);
  };

// export const new_game = () => (dispatch: Dispatch<Game_Action>) => {
//   dispatch({
//     type: Action_Type.NEW_GAME,
//   });
// };

// export const toggle_player =
//   (next_player: number, board: (number[] | null[])[]) =>
//   (dispatch: Dispatch<Game_Action>) => {
//     dispatch({
//       type: Action_Type.TOGGLE_PLAYER,
//       current_player: next_player,
//       board,
//     });
//   };

// export const update_message =
//   (message: string) => (dispatch: Dispatch<Game_Action>) => {
//     dispatch({
//       type: Action_Type.UPDATE_MESSAGE,
//       message,
//     });
//   };

// export const end_game =
//   (message: string, board: (number[] | null[])[]) =>
//   (dispatch: Dispatch<Game_Action>) => {
//     dispatch({
//       type: Action_Type.END_GAME,
//       message,
//       board,
//     });
//   };
