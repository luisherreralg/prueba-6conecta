import { ActionReducerMap } from '@ngrx/store';
import { PokemonReducer, State } from './pokemon.reducer/pokemon.reducer';

export interface AppState {
  pokemons: State;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  pokemons: PokemonReducer,
};
