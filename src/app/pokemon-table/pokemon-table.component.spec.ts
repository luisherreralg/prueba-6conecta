import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Pokemon } from '../utils/interfaces/Pokemon';
import { PokemonList } from '../utils/interfaces/PokemonList';

import { PokemonTableComponent } from './pokemon-table.component';

describe('PokemonTableComponent', (): void => {
  let component: PokemonTableComponent;
  let fixture: ComponentFixture<PokemonTableComponent>;
  let pokemonsMock: Pokemon[];
  let pokemonsList: PokemonList;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [PokemonTableComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

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

    pokemonsList = {
      results: [
        {
          name: 'Bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    } as PokemonList;

    fixture = TestBed.createComponent(PokemonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  describe('When the component its initialized', (): void => {
    it('should call to the pokemonService', (): void => {
      const serviceSpy = spyOn(
        component.pokemonService,
        'getPokemons'
      ).and.returnValue(of([]));

      component.ngOnInit();

      expect(serviceSpy).toHaveBeenCalledWith();
    });

    it('should call to the apiService.getPokemonList method', (): void => {
      const apiServiceGetList = spyOn(
        component.apiService,
        'getPokemonList'
      ).and.returnValue(of(pokemonsList));

      component.pokemons = pokemonsMock;

      component.ngOnInit();

      expect(apiServiceGetList).toHaveBeenCalledWith();
    });

    it('should call to the pokemonService getPokemon method', (): void => {
      const apiServiceGetList = spyOn(
        component.apiService,
        'getPokemonList'
      ).and.returnValue(of(pokemonsList));

      const pokemonServiceGetPokemon = spyOn(
        component.apiService,
        'getPokemon'
      ).and.returnValue(of(pokemonsMock[0]));

      component.pokemons = pokemonsMock;

      component.ngOnInit();

      expect(apiServiceGetList).toHaveBeenCalledWith();
      expect(pokemonServiceGetPokemon).toHaveBeenCalledWith(
        pokemonsMock[0].name
      );
    });
  });
});
