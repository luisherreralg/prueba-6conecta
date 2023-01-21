import { createReducer, on } from '@ngrx/store';
import { Pokemon } from '../../utils/interfaces/Pokemon';
import * as actions from './pokemon.action.creator';

export interface State {
  pokemons: Pokemon[];
}

const initialState = {
  pokemons: [] as Pokemon[],
};

export const PokemonReducer = createReducer(
  initialState,

  on(
    actions.loadPokemon,
    (state, { pokemon }): State => ({
      pokemons: pokemon,
    })
  ),

  on(
    actions.addPokemon,
    (state, { newPokemon }): State => ({
      pokemons: [...state.pokemons, newPokemon],
    })
  ),

  on(
    actions.deletePokemon,
    (state, { pokemonId }): State => ({
      pokemons: state.pokemons.filter(
        (pokemon): boolean => pokemon.id !== pokemonId
      ),
    })
  )
);
