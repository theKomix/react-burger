describe('show ingredient\'s details' , () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should change bun in ingredient list', () => {
    cy.get('#react-burger-modal').should('be.empty');
    cy.get('[data-cy="ingredient-bun"] img[alt^="Флюоресцентная булка"]').click();
    cy.get('#react-burger-modal').should("not.be.empty");

    cy.get('#react-burger-modal').contains('Детали ингридиента');
    cy.get('#react-burger-modal').find('img').should('be.visible');

    cy.get('span[class^="modal-header_close"]').click();
    cy.get('#react-burger-modal').should('be.empty');
  });
})