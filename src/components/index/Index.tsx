import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import {
  get_pokemon_list,
  get_pokemon_stats,
} from "../../action_creators/pokemon_actions";
import Preloader from "../preloader/Preloader";

function Index() {
  const dispatch = useDispatch();

  const loading_pokemon_list = useAppSelector(
    (state) => state.pokemon.loading_pokemon_list
  );

  const loading_pokemon_stats = useAppSelector(
    (state) => state.pokemon.loading_pokemon_stats
  );

  const pokemon_list = useAppSelector((state) => state.pokemon.pokemon_list);

  useEffect(() => {
    dispatch(get_pokemon_list());
  }, []);

  useEffect(() => {
    dispatch(get_pokemon_stats(pokemon_list));
  }, [loading_pokemon_list]);

  function render_case_studies() {
    // https://stackoverflow.com/a/42393106
    // Create array of N elements, where N is the number of rows needed
    const rows = [...Array(Math.ceil(pokemon_list!.length / 2))];
    // Chunk the case studies into the array of rows
    const pokemon_list_rows = rows.map((row, i) =>
      pokemon_list!.slice(i * 3, i * 3 + 3)
    );
    if (pokemon_list!.length > 0) {
      return pokemon_list_rows.map((pokemon_list_row, i) => {
        return (
          <div className="row" key={i}>
            {pokemon_list_row.map((pokemon, i) => {
              return (
                <div key={i}>
                  <div className="col m4 card custom-card">{pokemon!.name}</div>
                </div>
              );
            })}
          </div>
        );
      });
    } else {
      return (
        <div className="row">
          <div className="col m12">Not Available</div>
        </div>
      );
    }
  }

  return (
    <div>
      {loading_pokemon_stats ? (
        <div className="row mt-50">
          <div className="col s12 m12 center-align">
            <Preloader />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col m10 offset-m1">{render_case_studies()}</div>
        </div>
      )}
    </div>
  );
}

export default Index;
