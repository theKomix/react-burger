describe('add bun to order', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="ingredient-bun"] img[alt^="Краторная булка"]').trigger("dragstart");
    cy.get('[data-cy="bun-droppable"]').trigger("drop").trigger("dragend");
  });

  it('should change bun in ingredient list', () => {
    cy.get('[data-cy="bun-droppable"] .constructor-element_pos_top');

    cy.get('[data-cy="ingredient-bun"] img[alt^="Флюоресцентная булка"]').trigger("dragstart");
    cy.get('[data-cy="bun-droppable"]').first().trigger("drop").trigger("dragend");
    cy.get('[data-cy="burger-constructor"]').contains("Флюоресцентная булка");

    cy.get('[data-cy="ingredient-bun"]').contains('Краторная булка').then($a => {
      let count = $a.parent().find('.counter__num').first();
      expect(count.text()).to.equal('');
    });

    cy.get('[data-cy="ingredient-bun"]').contains('Флюоресцентная булка').then($a => {
      let count = $a.parent().find('.counter__num').first();
      expect(count.text()).to.equal('2');
    });
  });
})