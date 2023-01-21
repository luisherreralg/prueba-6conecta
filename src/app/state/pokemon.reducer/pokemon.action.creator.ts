import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../utils/interfaces/Pokemon';

export const loadPokemon = createAction(
  '[Pokemon] Load Pokemon',
  props<{ pokemon: Pokemon[] }>()
);

export const addPokemon = createAction(
  '[Pokemon] Add Pokemon',
  props<{ newPokemon: Pokemon }>()
);

export const deletePokemon = createAction(
  '[Pokemon] Delete Pokemon',
  props<{ pokemonId: number }>()
);
