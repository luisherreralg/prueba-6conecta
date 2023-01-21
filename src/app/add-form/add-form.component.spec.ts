import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormComponent } from './add-form.component';

describe('AddFormComponent', (): void => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AddFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  describe('Given the addPokemon method, when its invoked', (): void => {
    it('should call to the pokemonService addPokemon method, form reset and toggleButton method', (): void => {
      const spyAddPokemon = spyOn(component.pokemonService, 'addPokemon');
      const spyReset = spyOn(component.form, 'reset');
      const spyToggle = spyOn(component, 'toggleButton');

      spyOn(component.form, 'value').and.returnValue({});

      component.addPokemon();

      // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
      expect(spyAddPokemon).toHaveBeenCalled();
      expect(spyReset).toHaveBeenCalledWith();
      expect(spyToggle).toHaveBeenCalledWith();
    });
  });

  describe('Given the toggleButton method, when its invoked', (): void => {
    it('should change the toggle variable value', (): void => {
      component.toggleButton();

      expect(component.toggle).toBe(true);
    });
  });
});
