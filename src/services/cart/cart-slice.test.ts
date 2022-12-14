import reducer, { initialState, addIngredient, removeIngredient, moveIngredient  } from "./cart-slice";
import {Ingredient} from "../../models/ingredient";

describe('cart slice tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(
            initialState
        );
    });

    const ingredients: Ingredient[] = [
        {"_id":"60d3b41abdacab0026a733c6","name":"Краторная булка N-200i","type":"bun","proteins":80,"fat":24,"carbohydrates":53,"calories":420,"price":1255,"image":"https://code.s3.yandex.net/react/code/bun-02.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0},
        {"_id":"60d3b41abdacab0026a733c7","name":"Флюоресцентная булка R2-D3","type":"bun","proteins":44,"fat":26,"carbohydrates":85,"calories":643,"price":988,"image":"https://code.s3.yandex.net/react/code/bun-01.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png","__v":0},
        {"_id":"60d3b41abdacab0026a733cb","name":"Биокотлета из марсианской Магнолии","type":"main","proteins":420,"fat":142,"carbohydrates":242,"calories":4242,"price":424,"image":"https://code.s3.yandex.net/react/code/meat-01.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png","__v":0},
        {"_id":"60d3b41abdacab0026a733cc","name":"Соус Spicy-X","type":"sauce","proteins":30,"fat":20,"carbohydrates":40,"calories":30,"price":90,"image":"https://code.s3.yandex.net/react/code/sauce-02.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png","__v":0},
        {"_id":"60d3b41abdacab0026a733cd","name":"Соус фирменный Space Sauce","type":"sauce","proteins":50,"fat":22,"carbohydrates":11,"calories":14,"price":80,"image":"https://code.s3.yandex.net/react/code/sauce-04.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png","__v":0}
    ];

    it("cart add item", () => {
        expect(reducer({sum: 0, items: []}, addIngredient(ingredients[0]))).toEqual(
            {
                sum: ingredients[0].price * 2,
                items: [
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    },
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    }
                ]
            }
        );
    });

    it("cart replace bun", () => {
        expect(reducer({sum: ingredients[0].price * 2, items: [{id: "1", ingredient: ingredients[0]}, {id: "2", ingredient: ingredients[0]}]}, addIngredient(ingredients[1]))).toEqual(
            {
                sum: ingredients[1].price * 2,
                items: [
                    {
                        id: expect.any(String),
                        ingredient: ingredients[1]
                    },
                    {
                        id: expect.any(String),
                        ingredient: ingredients[1]
                    }
                ]
            }
        );
    });

    it("cart add meat", () => {
        expect(reducer({sum: ingredients[0].price * 2, items: [{id: "1", ingredient: ingredients[0]}, {id: "2", ingredient: ingredients[0]}]}, addIngredient(ingredients[2]))).toEqual(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price,
                items: [
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    },
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    },
                    {
                        id: expect.any(String),
                        ingredient: ingredients[2]
                    }
                ]
            }
        );
    });

    it("remove ingredient", () => {
        expect(reducer(
            {sum: ingredients[0].price * 2, items: [{id: "1", ingredient: ingredients[0]}, {id: "2", ingredient: ingredients[0]}, {id: "3", ingredient: ingredients[2]}]},
            removeIngredient("3"))
        ).toEqual(
            {
                sum: ingredients[0].price * 2,
                items: [
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    },
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    }
                ]
            }
        );
    });

    it("disabled remove bun", () => {
        expect(reducer(
            {sum: ingredients[0].price * 2, items: [{id: "1", ingredient: ingredients[0]}, {id: "2", ingredient: ingredients[0]}, {id: "3", ingredient: ingredients[2]}]},
            removeIngredient("1"))
        ).toEqual(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price,
                items: [
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    },
                    {
                        id: expect.any(String),
                        ingredient: ingredients[0]
                    },
                    {
                        id: expect.any(String),
                        ingredient: ingredients[2]
                    }
                ]
            }
        );
    });

    it("move ingredient to end", () => {
        expect(reducer(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price + ingredients[3].price + ingredients[4].price,
                items: [{id: "1", ingredient: ingredients[0]}, {id: "2", ingredient: ingredients[0]}, {id: "3", ingredient: ingredients[2]}, {id: "4", ingredient: ingredients[3]}, {id: "5", ingredient: ingredients[4]}]},
            moveIngredient({id: "3", newIndex: 4}))
        ).toEqual(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price + ingredients[3].price + ingredients[4].price,
                items: [
                    {
                        id: "1",
                        ingredient: ingredients[0]
                    },
                    {
                        id: "2",
                        ingredient: ingredients[0]
                    },
                    {
                        id: "4",
                        ingredient: ingredients[3]
                    },
                    {
                        id: "5",
                        ingredient: ingredients[4]
                    },
                    {
                        id: "3",
                        ingredient: ingredients[2]
                    }
                ]
            }
        );
    });

    it("move ingredient to middle", () => {
        expect(reducer(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price + ingredients[3].price + ingredients[4].price,
                items: [{id: "1", ingredient: ingredients[0]}, {id: "2", ingredient: ingredients[0]}, {id: "3", ingredient: ingredients[2]}, {id: "4", ingredient: ingredients[3]}, {id: "5", ingredient: ingredients[4]}]},
            moveIngredient({id: "3", newIndex: 3}))
        ).toEqual(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price + ingredients[3].price + ingredients[4].price,
                items: [
                    {
                        id: "1",
                        ingredient: ingredients[0]
                    },
                    {
                        id: "2",
                        ingredient: ingredients[0]
                    },
                    {
                        id: "4",
                        ingredient: ingredients[3]
                    },
                    {
                        id: "3",
                        ingredient: ingredients[2]
                    },
                    {
                        id: "5",
                        ingredient: ingredients[4]
                    }
                ]
            }
        );
    });

    it("move ingredient to first", () => {
        expect(reducer(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price + ingredients[3].price + ingredients[4].price,
                items: [{id: "1", ingredient: ingredients[0]}, {id: "2", ingredient: ingredients[0]}, {id: "3", ingredient: ingredients[2]}, {id: "4", ingredient: ingredients[3]}, {id: "5", ingredient: ingredients[4]}]},
            moveIngredient({id: "5", newIndex: 2}))
        ).toEqual(
            {
                sum: ingredients[0].price * 2 + ingredients[2].price + ingredients[3].price + ingredients[4].price,
                items: [
                    {
                        id: "1",
                        ingredient: ingredients[0]
                    },
                    {
                        id: "2",
                        ingredient: ingredients[0]
                    },
                    {
                        id: "5",
                        ingredient: ingredients[4]
                    },
                    {
                        id: "3",
                        ingredient: ingredients[2]
                    },
                    {
                        id: "4",
                        ingredient: ingredients[3]
                    }
                ]
            }
        );
    });
})