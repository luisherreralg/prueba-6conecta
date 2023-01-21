/* eslint-disable @typescript-eslint/no-unused-expressions */

describe('Load the main page', (): void => {
  it('Visits the initial project page', (): void => {
    cy.visit('/');
    cy.contains('Listado de Pokemons');
  });
});

describe('Check Form for add pokemons', (): void => {
  beforeEach((): void => {
    cy.visit('/');
  });

  it('Complete the form and submit', (): void => {
    cy.contains('Añadir Pokemon').click();
    cy.get('input[name="id"]').type('0');
    cy.get('input[name="name"]').type('Pikachu');
    cy.get('input[name="image"]').type(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
    cy.get('input[name="height"]').type('4');
    cy.get('input[name="weight"]').type('60');
    cy.get("button[class='add-pokemon-button']").click();

    expect(cy.contains('Pikachu')).to.exist;
  });
});

describe('Check if the filters work correctly', (): void => {
  beforeEach((): void => {
    cy.visit('/');
  });

  it('Check if the filter by name works correctly', (): void => {
    cy.get("select[data-test-id='type-filter']").select('fire');

    expect(cy.contains('charmander')).to.exist;
  });

  it('Check if the order filter works correctly', (): void => {
    cy.wait(2000);

    cy.get("select[data-test-id='order-filter']")
      .select('desc')
      .should('have.value', 'desc');

    expect(cy.get('td[class="pokemon-name"]').contains('misdreavus')).to.exist;
  });
});
