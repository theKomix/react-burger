import {
  selectorIngredientBun,
  selectorBunDroppable,
  selectorIngredientDragDrop,
  selectBurgerConstructor,
  selectorModalId,
  ingredientBun1Name, ingredientMain1Name, ingredientSauce1Name
} from './selectors';

describe('add bun to order', () => {
  beforeEach(function() {
    cy.visit('');
  });

  const expectIngredientCount = (type: 'bun' | 'main' | 'sauce', name: string, expectCount: string) => {
    cy.get(`[data-cy="ingredient-${type}"]`).contains(name).then($a => {
      let count = $a.parent().find('.counter__num').first();
      expect(count.text()).to.equal(expectCount);
    });
  };

  const dragAndDropBun = (name: string) => {
    cy.get(`${selectorIngredientBun} img[alt^="${name}"]`).trigger('dragstart');
    cy.get(selectorBunDroppable).trigger('drop').trigger('dragend');
  };

  const dragAndDropIngredient = (type: 'bun' | 'main' | 'sauce', name: string, after: string = '') => {
    cy.get(`[data-cy="ingredient-${type}"] img[alt^="${name}"]`).trigger('dragstart');
    if (after) {
      cy.get(selectorIngredientDragDrop).contains(after).trigger('drop').trigger('dragend');
    }
    else {
      cy.get(selectorIngredientDragDrop).last().trigger('drop').trigger('dragend');
    }
  };

  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');
    cy.contains('Не забудьте выбрать булку');
    cy.contains('Перетащите сюда ингредиенты');
  });

  it('drag bun to ingredient list', () => {
    dragAndDropBun(ingredientBun1Name);
    cy.get(selectBurgerConstructor).contains(ingredientBun1Name);
    expectIngredientCount('bun', ingredientBun1Name, '2');
  });

  it('drag ingredient to ingredient list', () => {
    dragAndDropBun(ingredientBun1Name);
    dragAndDropIngredient('main', ingredientMain1Name);
    cy.get(selectBurgerConstructor).contains(ingredientMain1Name);
    expectIngredientCount('main', ingredientMain1Name, '1');

    dragAndDropIngredient('main', ingredientMain1Name);
    expectIngredientCount('main', ingredientMain1Name, '2');

    dragAndDropIngredient('sauce', ingredientSauce1Name, ingredientMain1Name);
    expectIngredientCount('sauce', ingredientSauce1Name, '1');
  });

  it('move ingredients', () => {
    dragAndDropBun(ingredientBun1Name);
    dragAndDropIngredient('main', ingredientMain1Name);
    dragAndDropIngredient('main', ingredientMain1Name);
    dragAndDropIngredient('sauce', ingredientSauce1Name, ingredientMain1Name);

    cy.get(selectorIngredientDragDrop).last().trigger('dragstart');
    cy.get(selectorIngredientDragDrop).first().trigger('drop').trigger('dragend');
    cy.get(selectorIngredientDragDrop).each(($i, index) => {
      const ingredientName = $i.find('.constructor-element__text').text();
      if(index === 0){
        expect(ingredientName).to.equal(ingredientMain1Name);
      }
      if(index === 1){
        expect(ingredientName).to.equal(ingredientMain1Name);
      }
      if(index === 2){
        expect(ingredientName).to.equal(ingredientSauce1Name);
      }
    });
  });

  it('make order', () => {
    cy.get(selectorModalId).should("be.empty");

    dragAndDropBun(ingredientBun1Name);
    dragAndDropIngredient('main', ingredientMain1Name);
    dragAndDropIngredient('main', ingredientMain1Name);
    dragAndDropIngredient('sauce', ingredientSauce1Name, ingredientMain1Name);

    cy.get('button').contains('Оформить заказ').click();
    cy.get('input[type="email"]').type('thekomix@yandex.ru');
    cy.get('input[type="password"]').type('Aa123456');
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.get(selectorModalId).should("not.be.empty");

    cy.wait(20000);

    cy.get(selectorModalId).find('img[alt="done"]').should('be.visible');
  });
})