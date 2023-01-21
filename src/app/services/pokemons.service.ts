import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Pokemon } from '../utils/interfaces/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  public pokemons: Pokemon[];

  public pokemons$: Subject<Pokemon[]>;

  constructor() {
    this.pokemons = [];
    this.pokemons$ = new Subject();
  }

  resetPokemons = (): void => {
    this.pokemons = [];
    this.pokemons$.next(this.pokemons);
  };

  addPokemon = (pokemon: Pokemon): void => {
    this.pokemons.push(pokemon);
    this.orderPokemons();
  };

  getPokemons = (): Observable<Pokemon[]> => {
    return this.pokemons$.asObservable();
  };

  orderPokemons = (order = 'asc'): void => {
    if (order === 'asc') {
      this.pokemons.sort((a, b): number => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
    } else {
      this.pokemons.sort((a, b): number => {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
        return 0;
      });
    }

    this.pokemons$.next(this.pokemons);
  };
}
