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
                  <div className="col m4 s12 card">
                    <div className="card-image">
                      <img src={pokemon!.image} />
                    </div>
                    <div className="card-content">
                      <div className="row">
                        <div className="col m12 s12">
                          <div className="row">
                            <div className="col m12">
                              <div className="pokemon-id">#{pokemon!.id}</div>
                              <div className="pokemon-name">
                                {pokemon!.name}
                              </div>
                            </div>
                          </div>

                          <div className="row custom-badge-pill">
                            {pokemon!.types.map((type: any, i) => {
                              return (
                                <div className="col m6 s12 center-align">
                                  <div className="badge badge-pill custom-badge-pill capitalize">
                                    {type.type.name}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {pokemon!.stats.map((stat: any, i) => {
                            if (
                              stat.stat.name != "special-attack" &&
                              stat.stat.name != "special-defense"
                            ) {
                              let abbreviated_state_name = null;

                              let custom_progress = null;

                              let custom_determinate = null;

                              switch (stat.stat.name) {
                                case "hp":
                                  abbreviated_state_name = "HP";
                                  custom_progress = "custom_progress_hp";
                                  custom_determinate = "custom_determinate_hp";
                                  break;
                                case "attack":
                                  abbreviated_state_name = "ATK";
                                  custom_progress = "custom_progress_atk";
                                  custom_determinate = "custom_determinate_atk";
                                  break;
                                case "defense":
                                  abbreviated_state_name = "DEF";
                                  custom_progress = "custom_progress_def";
                                  custom_determinate = "custom_determinate_def";
                                  break;
                                case "speed":
                                  abbreviated_state_name = "SPD";
                                  custom_progress = "custom_progress_spd";
                                  custom_determinate = "custom_determinate_spd";
                                  break;
                              }

                              let determinate_width = stat.base_stat + "%";

                              return (
                                <div className="row">
                                  <div className="col m3 s12 uppercase">
                                    {abbreviated_state_name}
                                  </div>
                                  <div className="col m9 s12">
                                    <div
                                      className={`progress ${custom_progress}`}
                                    >
                                      <div
                                        className={`determinate ${custom_determinate}`}
                                        style={{ width: determinate_width }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
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
          <div className="col m10 offset-m1 s12">{render_case_studies()}</div>
        </div>
      )}
    </div>
  );
}

export default Index;
