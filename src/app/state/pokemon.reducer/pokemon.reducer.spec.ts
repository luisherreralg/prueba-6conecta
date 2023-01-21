import { Pokemon } from 'src/app/utils/interfaces/Pokemon';
import {
  addPokemon,
  deletePokemon,
  loadPokemon,
} from './pokemon.action.creator';
import { PokemonReducer } from './pokemon.reducer';

describe('Given the PokemonReducer', (): void => {
  const pokemonMock: Pokemon[] = [{} as Pokemon];

  const initialState = {
    pokemons: [] as Pokemon[],
  };

  describe('Given the loadOrders action', (): void => {
    it('should load orders', (): void => {
      const action = loadPokemon({ pokemon: pokemonMock });
      const state = PokemonReducer(initialState, action);

      expect(state.pokemons).toEqual(pokemonMock);
    });
  });

  describe('Given the addOrder action', (): void => {
    it('should add a new order', (): void => {
      pokemonMock[0].id = 1;

      const action = addPokemon({ newPokemon: pokemonMock[0] });
      const state = PokemonReducer(initialState, action);

      expect(state.pokemons.length).toBe(1);
    });
  });

  describe('Given the deleteOrder action', (): void => {
    it('should delete an existing order', (): void => {
      pokemonMock[0].id = 1;

      const action = deletePokemon({ pokemonId: pokemonMock[0].id });
      const state = PokemonReducer(initialState, action);

      expect(state.pokemons.length).toBe(0);
    });

    it('should not delete an order if the id does not exist', (): void => {
      pokemonMock[0].id = 1;

      const action = deletePokemon({ pokemonId: 2 });
      const state = PokemonReducer(initialState, action);

      expect(state.pokemons.length).toBe(0);
    });

    it('the filter inside the delete pokemon action, should return false if there is not matching ids', (): void => {
      const spyFilter = spyOn(Array.prototype, 'filter').and.callThrough();

      pokemonMock[0].id = 1;

      const action = deletePokemon({ pokemonId: 2 });
      PokemonReducer(initialState, action);

      expect(spyFilter).toHaveBeenCalledWith(jasmine.any(Function));
    });
  });
});
