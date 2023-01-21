import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../utils/interfaces/Pokemon';
import { PokemonByType } from '../utils/interfaces/PokemonByType';
import { PokemonList } from '../utils/interfaces/PokemonList';
import { TypeList } from '../utils/interfaces/TypeList';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = 'https://pokeapi.co/api/v2';
  }

  getPokemonList = (): Observable<PokemonList> => {
    return this.http.get<PokemonList>(
      `${this.apiUrl}/pokemon`
    ) as Observable<PokemonList>;
  };

  getTypesList = (): Observable<TypeList> => {
    return this.http.get<TypeList>(
      `${this.apiUrl}/type`
    ) as Observable<TypeList>;
  };

  getPokemonByTypeList = (type: string): Observable<PokemonByType> => {
    return this.http.get<PokemonByType>(
      `${this.apiUrl}/type/${type}`
    ) as Observable<PokemonByType>;
  };

  getPokemon = (name: string): Observable<Pokemon> => {
    return this.http.get<Pokemon>(
      `${this.apiUrl}/pokemon/${name}`
    ) as Observable<Pokemon>;
  };
}
