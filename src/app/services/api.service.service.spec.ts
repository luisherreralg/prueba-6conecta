/* eslint-disable jasmine/no-spec-dupes */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceService } from './api.service.service';

describe('ApiServiceService', (): void => {
  let service: ApiServiceService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  describe('When the getPokemonList method is invoked', (): void => {
    it('should return a list of pokemons', (): void => {
      service.getPokemonList().subscribe((response): void => {
        expect(response).toBeTruthy();
      });
    });

    it('should call to the HttpClient', (): void => {
      const spy = spyOn(service.http, 'get').and.callThrough();
      service.getPokemonList();

      expect(spy).toHaveBeenCalledWith(`${service.apiUrl}/pokemon`);
    });
  });

  describe('When the getTypesList method is invoked', (): void => {
    it('should return a list of types', (): void => {
      service.getTypesList().subscribe((response): void => {
        expect(response).toBeTruthy();
      });
    });

    it('should call to the HttpClient', (): void => {
      const spy = spyOn(service.http, 'get').and.callThrough();
      service.getTypesList();

      expect(spy).toHaveBeenCalledWith(`${service.apiUrl}/type`);
    });
  });

  describe('When the getPokemonByTypeList method is invoked', (): void => {
    it('should return a list of pokemons by type', (): void => {
      service.getPokemonByTypeList('fire').subscribe((response): void => {
        expect(response).toBeTruthy();
      });
    });

    it('should call to the HttpClient', (): void => {
      const spy = spyOn(service.http, 'get').and.callThrough();
      service.getPokemonByTypeList('fire');

      expect(spy).toHaveBeenCalledWith(`${service.apiUrl}/type/fire`);
    });
  });

  describe('When the getPokemon method is invoked', (): void => {
    it('should return a pokemon', (): void => {
      service.getPokemon('pikachu').subscribe((response): void => {
        expect(response).toBeTruthy();
      });
    });

    it('should call to the HttpClient', (): void => {
      const spy = spyOn(service.http, 'get').and.callThrough();
      service.getPokemon('pikachu');

      expect(spy).toHaveBeenCalledWith(`${service.apiUrl}/pokemon/pikachu`);
    });
  });
});
