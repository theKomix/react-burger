import {
  selectorIngredientBun,
  ingredientBun2Name,
  selectorModalId
} from './selectors';

describe('show ingredient\'s details' , () => {
  before(function() {
    cy.visit('');
  });

  it('should change bun in ingredient list', () => {
    cy.get(selectorModalId).should('be.empty');
    cy.get(`${selectorIngredientBun} img[alt^="${ingredientBun2Name}"]`).click();
    cy.get(selectorModalId).should("not.be.empty");

    cy.get(selectorModalId).contains('Детали ингридиента');
    cy.get(selectorModalId).find('img').should('be.visible');

    cy.get('span[class^="modal-header_close"]').click();
    cy.get(selectorModalId).should('be.empty');
  });
})