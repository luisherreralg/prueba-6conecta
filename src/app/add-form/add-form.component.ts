import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../utils/interfaces/Pokemon';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.sass'],
})
export class AddFormComponent {
  form: FormGroup;

  toggle = false;

  constructor(public pokemonService: PokemonsService) {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      image: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),
    });
  }

  addPokemon(): void {
    const pokemon: Pokemon = {
      id: this.form.value.id,
      name: this.form.value.name,
      height: this.form.value.height,
      weight: this.form.value.weight,
      sprites: {
        front_default: this.form.value.image,
      },
    } as Pokemon;

    this.pokemonService.addPokemon(pokemon);
    this.form.reset();
    this.toggleButton();
  }

  toggleButton = (): void => {
    this.toggle = !this.toggle;
  };
}
