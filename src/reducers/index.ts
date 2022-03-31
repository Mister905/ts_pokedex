import { combineReducers } from "redux";
import pokemon_reducer from "./pokemon_reducer";

const reducers = combineReducers({
    pokemon: pokemon_reducer,
});

export default reducers;
