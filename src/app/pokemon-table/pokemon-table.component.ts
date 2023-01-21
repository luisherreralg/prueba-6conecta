import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiServiceService } from '../services/api.service.service';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../utils/interfaces/Pokemon';
import { Result } from '../utils/interfaces/TypeList';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.sass'],
})
export class PokemonTableComponent implements OnInit {
  pokeUrls: Result[] = [];

  pokeUrls$: Subject<Result[]>;

  pokemons: Pokemon[] = [];

  constructor(
    public apiService: ApiServiceService,
    public pokemonService: PokemonsService
  ) {
    this.pokeUrls$ = new Subject();
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data): void => {
      this.pokemons = data;
    });

    this.apiService.getPokemonList().subscribe((data): void => {
      this.pokeUrls = data.results;
      this.pokeUrls$.next(this.pokeUrls);
    });

    this.pokeUrls$.subscribe((data): void => {
      data.forEach((url): void => {
        this.apiService.getPokemon(url.name).subscribe((pokemon): void => {
          this.pokemonService.addPokemon(pokemon);
        });
      });
    });

    this.pokemons.sort((a, b): number => {
      return a.id - b.id;
    });
  }
}
