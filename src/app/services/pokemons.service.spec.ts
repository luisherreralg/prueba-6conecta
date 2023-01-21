import { TestBed } from '@angular/core/testing';
import { Pokemon } from '../utils/interfaces/Pokemon';

import { PokemonsService } from './pokemons.service';

describe('PokemonsService', (): void => {
  let service: PokemonsService;
  let pokemonsMock: Pokemon[];

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonsService);
    pokemonsMock = [
      {
        id: 1,
        name: 'Bulbasaur',
      },
      {
        id: 2,
        name: 'Ivysaur',
      },
    ] as Pokemon[];
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  describe('Given the resetPokemons method, when its invoked', (): void => {
    it('should change the pokemons array to an empty array', (): void => {
      service.pokemons = pokemonsMock;

      service.resetPokemons();

      expect(service.pokemons).toEqual([]);
    });

    it('should call to the pokemonsService', (): void => {
      const spyService = spyOn(service, 'resetPokemons').and.callThrough();

      service.resetPokemons();

      expect(spyService).toHaveBeenCalledWith();
    });
  });

  describe('Given the addPokemons method, when its invoked', (): void => {
    it('should add a new pokemon to the pokemons array', (): void => {
      service.pokemons = pokemonsMock;
      const newPokemon: Pokemon = {
        id: 3,
        name: 'Venusaur',
      } as Pokemon;

      service.addPokemon(newPokemon);

      expect(service.pokemons.length).toEqual(3);
    });

    it('should call to the pokememons.service', (): void => {
      const spyService = spyOn(service, 'addPokemon').and.callThrough();
      service.pokemons = pokemonsMock;
      const newPokemon: Pokemon = {} as Pokemon;

      service.addPokemon(newPokemon);

      expect(spyService).toHaveBeenCalledWith(newPokemon);
    });
  });

  describe('Given the orderPokemons method  "asc" parameter, when its invoked', (): void => {
    it('should reorder the pokemons in ascending order', (): void => {
      service.pokemons = pokemonsMock;

      service.orderPokemons('asc');

      expect(service.pokemons[0].id).toEqual(1);
    });

    it('should order the pokemons if they are not correctly orderer a.id < b.id', (): void => {
      const a = pokemonsMock[1];
      const b = pokemonsMock[0];
      service.pokemons = [a, b];

      service.orderPokemons('asc');

      expect(service.pokemons[0].id).toEqual(1);
    });

    it('should do nothing if the pokemons have the same id', (): void => {
      const a = pokemonsMock[0];
      const b = pokemonsMock[0];
      service.pokemons = [a, b];

      service.orderPokemons('asc');

      expect(service.pokemons[0].id).toEqual(1);
    });
  });

  describe('Given the orderPokemons method "desc" parameter, when its invoked', (): void => {
    it('should reorder the pokemons in descending order', (): void => {
      service.pokemons = pokemonsMock;

      service.orderPokemons('desc');

      expect(service.pokemons[0].id).toEqual(2);
    });

    it('should order the pokemons if they are not correctly orderer a.id > b.id', (): void => {
      const a = pokemonsMock[1];
      const b = pokemonsMock[0];
      service.pokemons = [a, b];

      service.orderPokemons('desc');

      expect(service.pokemons[0].id).toEqual(2);
    });

    it('should do nothing if the pokemons have the same id ', (): void => {
      const a = pokemonsMock[0];
      const b = pokemonsMock[0];
      service.pokemons = [a, b];

      service.orderPokemons('desc');

      expect(service.pokemons[0].id).toEqual(1);
    });
  });
});
