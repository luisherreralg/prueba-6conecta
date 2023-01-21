import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/utils/interfaces/Pokemon';
import * as PokemonByTypeTypes from 'src/app/utils/interfaces/PokemonByType';
import { PokemonList, Result } from 'src/app/utils/interfaces/PokemonList';

import { HeaderFiltersComponent } from './header-filters.component';

describe('HeaderFiltersComponent', (): void => {
  let component: HeaderFiltersComponent;
  let fixture: ComponentFixture<HeaderFiltersComponent>;
  let pokemonsListMock: PokemonList;
  let pokemonMock: Pokemon[];
  let pokemonByTypeListMock: PokemonByTypeTypes.PokemonByType;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [HeaderFiltersComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    pokemonsListMock = {
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ] as Result[],
    } as PokemonList;

    pokemonMock = [
      {
        id: 1,
        name: 'bulbasaur',
      } as Pokemon,
    ] as Pokemon[];

    pokemonByTypeListMock = {
      pokemon: [
        {
          pokemon: {
            name: 'bulbasaur',
          } as PokemonByTypeTypes.Generation,
          slot: 1,
        } as PokemonByTypeTypes.Pokemon,
      ] as PokemonByTypeTypes.Pokemon[],
    } as PokemonByTypeTypes.PokemonByType;

    fixture = TestBed.createComponent(HeaderFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  describe('Given the onChange method, when its invoked', (): void => {
    it('if the event.target.value =="asc" || "desc" should call to the pokemonService', (): void => {
      const event = {
        target: {
          value: 'asc',
        },
      };
      const spyOrder = spyOn(component.pokemonService, 'orderPokemons');
      component.onChange(event);

      expect(spyOrder).toHaveBeenCalledWith('asc');
    });

    it('if the event.target.value =="dsc" || "desc" should call to the pokemonService', (): void => {
      const event = {
        target: {
          value: 'desc',
        },
      };
      const spyOrder = spyOn(component.pokemonService, 'orderPokemons');
      component.onChange(event);

      expect(spyOrder).toHaveBeenCalledWith('desc');
    });

    it('should call to the resetPokemon method if there is no event.target.value with the value "asc" or "desc"', (): void => {
      const event = {
        target: {
          value: 'test',
        },
      };
      const spyReset = spyOn(component.pokemonService, 'resetPokemons');
      component.onChange(event);

      expect(spyReset).toHaveBeenCalledWith();
    });

    it('should call to the resetToDefault method if the event.target.value = "all"', (): void => {
      const event = {
        target: {
          value: 'all',
        },
      };
      const spyReset = spyOn(component, 'resetToDefault');
      component.onChange(event);

      expect(spyReset).toHaveBeenCalledWith();
    });
  });

  describe('Given the resetToDefault method, when its invoked', (): void => {
    it('should call to getPokemonList, getPokemon from the api service and the addPokemon from the pokemonService', (): void => {
      const spyGetPokemonList = spyOn(
        component.apiService,
        'getPokemonList'
      ).and.returnValue(of(pokemonsListMock));

      const spyGetPokemon = spyOn(
        component.apiService,
        'getPokemon'
      ).and.returnValue(of(pokemonMock[0]));

      const spyAddPokemon = spyOn(component.pokemonService, 'addPokemon');

      component.resetToDefault();

      expect(spyGetPokemonList).toHaveBeenCalledWith();
      expect(spyGetPokemon).toHaveBeenCalledWith(
        pokemonsListMock.results[0].name
      );

      expect(spyAddPokemon).toHaveBeenCalledWith(pokemonMock[0]);
    });
  });

  describe('Given the loadPokemonByType method, when its invoked', (): void => {
    it('should call to getPokemonByType from the api service and the addPokemon from the pokemonService', (): void => {
      const spyGetPokemonByType = spyOn(
        component.apiService,
        'getPokemonByTypeList'
      ).and.returnValue(of(pokemonByTypeListMock));

      const spygetPokemon = spyOn(
        component.apiService,
        'getPokemon'
      ).and.returnValue(of(pokemonMock[0]));

      const spyAddPokemon = spyOn(component.pokemonService, 'addPokemon');

      const eventMock = {
        target: {
          value: 'grass',
        },
      };

      component.loadPokemonByType(eventMock);

      expect(spyGetPokemonByType).toHaveBeenCalledWith('grass');
      expect(spygetPokemon).toHaveBeenCalledWith(
        pokemonByTypeListMock.pokemon[0].pokemon.name
      );

      expect(spyAddPokemon).toHaveBeenCalledWith(pokemonMock[0]);
    });
  });
});
