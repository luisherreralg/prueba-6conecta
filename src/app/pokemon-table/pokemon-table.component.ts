import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiServiceService } from '../services/api.service.service';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../utils/interfaces/Pokemon';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.sass'],
})
export class PokemonTableComponent {
  pokemonList$;

  pokemons$: Observable<Pokemon[]>;

  constructor(
    public apiService: ApiServiceService,
    public pokemonService: PokemonsService
  ) {
    this.pokemons$ = this.pokemonService.getPokemons();

    this.pokemonList$ = this.apiService
      .getPokemonList()
      .pipe(
        tap((data): void => {
          data.results.map((pokemon): void => {
            this.apiService
              .getPokemon(pokemon.name)
              .subscribe((fetchedPokemon): void => {
                this.pokemonService.addPokemon(fetchedPokemon);
              });
          });
        })
      )
      .subscribe();
  }
}
