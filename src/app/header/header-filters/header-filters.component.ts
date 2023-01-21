import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { Pokemon } from 'src/app/utils/interfaces/PokemonByType';

@Component({
  selector: 'app-header-filters',
  templateUrl: './header-filters.component.html',
  styleUrls: ['./header-filters.component.sass'],
})
export class HeaderFiltersComponent {
  form: FormGroup;

  constructor(public apiService: ApiServiceService, public store: Store) {
    this.form = new FormGroup({
      type: new FormControl(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange = (event: any): void => {
    this.apiService
      .getPokemonByTypeList(event.target.value)
      .subscribe((data): void => {
        data.pokemon.forEach((pokemon: Pokemon): void => {
          this.apiService.getPokemon(pokemon.pokemon.name);
        });
      });
  };
}
