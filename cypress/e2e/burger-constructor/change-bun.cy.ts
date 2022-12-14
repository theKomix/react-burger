import {selectorIngredientBun, selectorBunDroppable, ingredientBun1Name, ingredientBun2Name} from './selectors';

describe('add bun to order', () => {
  before(function() {
    cy.visit('');
    cy.get(`${selectorIngredientBun} img[alt^="${ingredientBun1Name}"]`).trigger('dragstart');
    cy.get(selectorBunDroppable).trigger("drop").trigger('dragend');
  });

  it('should change bun in ingredient list', () => {
    cy.get(`${selectorBunDroppable} .constructor-element_pos_top`);

    cy.get(`${selectorIngredientBun} img[alt^="${ingredientBun2Name}"]`).trigger('dragstart');
    cy.get(selectorBunDroppable).first().trigger('drop').trigger('dragend');
    cy.get('[data-cy="burger-constructor"]').contains(ingredientBun2Name);

    cy.get(selectorIngredientBun).contains(ingredientBun1Name).then($a => {
      let count = $a.parent().find('.counter__num').first();
      expect(count.text()).to.equal('');
    });

    cy.get(selectorIngredientBun).contains(ingredientBun2Name).then($a => {
      let count = $a.parent().find('.counter__num').first();
      expect(count.text()).to.equal('2');
    });
  });
})