import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { Pokemon, Generation } from 'src/app/utils/interfaces/PokemonByType';
import { Result } from 'src/app/utils/interfaces/PokemonList';

@Component({
  selector: 'app-header-filters',
  templateUrl: './header-filters.component.html',
  styleUrls: ['./header-filters.component.sass'],
})
export class HeaderFiltersComponent {
  form: FormGroup;

  pokeUrls: Generation[] = [];

  pokeUrls$: Subject<Generation[]>;

  constructor(
    public apiService: ApiServiceService,
    public pokemonService: PokemonsService
  ) {
    this.form = new FormGroup({
      type: new FormControl(),
      order: new FormControl(),
    });
    this.pokeUrls$ = new Subject();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange = (event: any): void => {
    if (event.target.value === 'asc' || event.target.value === 'desc') {
      return this.pokemonService.orderPokemons(event.target.value);
    }

    this.pokemonService.resetPokemons();

    if (event.target.value === 'all') {
      this.resetToDefault();
    }

    this.loadPokemonByType(event);
  };

  resetToDefault = (): void => {
    this.apiService.getPokemonList().subscribe((data): void => {
      data.results.forEach((pokemon: Result): void => {
        this.apiService.getPokemon(pokemon.name).subscribe((data2): void => {
          this.pokemonService.addPokemon(data2);
        });
      });
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadPokemonByType = (event: any): void => {
    this.apiService
      .getPokemonByTypeList(event.target.value)
      .subscribe((data): void => {
        data.pokemon.forEach((pokemon: Pokemon): void => {
          this.apiService
            .getPokemon(pokemon.pokemon.name)
            .subscribe((data2): void => {
              this.pokemonService.addPokemon(data2);
            });
        });
      });
  };
}
