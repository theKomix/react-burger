describe('add bun to order', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  const expectIngredientCount = (type: 'bun' | 'main' | 'sauce', name: string, expectCount: string) => {
    cy.get(`[data-cy="ingredient-${type}"]`).contains(name).then($a => {
      let count = $a.parent().find('.counter__num').first();
      expect(count.text()).to.equal(expectCount);
    });
  };

  const dragAndDropBun = (name: string) => {
    cy.get(`[data-cy="ingredient-bun"] img[alt^="${name}"]`).trigger('dragstart');
    cy.get('[data-cy="bun-droppable"]').trigger('drop').trigger('dragend');
  };

  const dragAndDropIngredient = (type: 'bun' | 'main' | 'sauce', name: string, after: string = '') => {
    cy.get(`[data-cy="ingredient-${type}"] img[alt^="${name}"]`).trigger('dragstart');
    if (after) {
      cy.get('[data-cy="ingredient-dragdrop"]').contains(after).trigger('drop').trigger('dragend');
    }
    else {
      cy.get('[data-cy="ingredient-dragdrop"]').last().trigger('drop').trigger('dragend');
    }
  };

  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');
    cy.contains('Не забудьте выбрать булку');
    cy.contains('Перетащите сюда ингредиенты');
  });

  it('drag bun to ingredient list', () => {
    dragAndDropBun('Краторная булка');
    cy.get('[data-cy="burger-constructor"]').contains('Краторная булка');
    expectIngredientCount('bun', 'Краторная булка', '2');
  });

  it('drag ingredient to ingredient list', () => {
    dragAndDropBun('Краторная булка');
    dragAndDropIngredient('main', 'Мясо бессмертных моллюсков Protostomia');
    cy.get('[data-cy="burger-constructor"]').contains('Мясо бессмертных моллюсков Protostomia');
    expectIngredientCount('main', 'Мясо бессмертных моллюсков Protostomia', '1');

    dragAndDropIngredient('main', 'Мясо бессмертных моллюсков Protostomia');
    expectIngredientCount('main', 'Мясо бессмертных моллюсков Protostomia', '2');

    dragAndDropIngredient('sauce', 'Соус фирменный Space Sauce', 'Мясо бессмертных моллюсков Protostomia');
    expectIngredientCount('sauce', 'Соус фирменный Space Sauce', '1');
  });

  it('move ingredients', () => {
    dragAndDropBun('Краторная булка');
    dragAndDropIngredient('main', 'Мясо бессмертных моллюсков Protostomia');
    dragAndDropIngredient('main', 'Мясо бессмертных моллюсков Protostomia');
    dragAndDropIngredient('sauce', 'Соус фирменный Space Sauce', 'Мясо бессмертных моллюсков Protostomia');

    cy.get('[data-cy="ingredient-dragdrop"]').last().trigger('dragstart');
    cy.get('[data-cy="ingredient-dragdrop"]').first().trigger('drop').trigger('dragend');
    cy.get('[data-cy="ingredient-dragdrop"]').each(($i, index) => {
      if(index === 0){
        expect($i.find('.constructor-element__text').text()).to.equal('Мясо бессмертных моллюсков Protostomia');
      }
      if(index === 1){
        expect($i.find('.constructor-element__text').text()).to.equal('Мясо бессмертных моллюсков Protostomia');
      }
      if(index === 2){
        expect($i.find('.constructor-element__text').text()).to.equal('Соус фирменный Space Sauce');
      }
    });
  });

  it('make order', () => {
    cy.get('#react-burger-modal').should("be.empty");

    dragAndDropBun('Краторная булка');
    dragAndDropIngredient('main', 'Мясо бессмертных моллюсков Protostomia');
    dragAndDropIngredient('main', 'Мясо бессмертных моллюсков Protostomia');
    dragAndDropIngredient('sauce', 'Соус фирменный Space Sauce', 'Мясо бессмертных моллюсков Protostomia');

    cy.get('button').contains('Оформить заказ').click();
    cy.get('input[type="email"]').type('thekomix@yandex.ru');
    cy.get('input[type="password"]').type('Aa123456');
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.get('#react-burger-modal').should("not.be.empty");

    cy.wait(20000);

    cy.get('#react-burger-modal').find('img[alt="done"]').should('be.visible');
  });
})