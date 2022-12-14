import reducer, { initialState, makeOrderAsync, getOrderAsync } from "./order-slice";
import fetchMock from 'fetch-mock';
import {PostOrderUrl, GetOrderUrl} from "../api-urls";
import {MakeOrderResult, GetOrderResult} from "./order-api";
import {store} from "../store";
import {Ingredient} from "../../models/ingredient";
import {saveTokens} from "../utils";
import {Order} from "../../models/order";

const ingredients: Ingredient[] = [
    {"_id":"60d3b41abdacab0026a733c6","name":"Краторная булка N-200i","type":"bun","proteins":80,"fat":24,"carbohydrates":53,"calories":420,"price":1255,"image":"https://code.s3.yandex.net/react/code/bun-02.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733c7","name":"Флюоресцентная булка R2-D3","type":"bun","proteins":44,"fat":26,"carbohydrates":85,"calories":643,"price":988,"image":"https://code.s3.yandex.net/react/code/bun-01.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733cb","name":"Биокотлета из марсианской Магнолии","type":"main","proteins":420,"fat":142,"carbohydrates":242,"calories":4242,"price":424,"image":"https://code.s3.yandex.net/react/code/meat-01.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733cc","name":"Соус Spicy-X","type":"sauce","proteins":30,"fat":20,"carbohydrates":40,"calories":30,"price":90,"image":"https://code.s3.yandex.net/react/code/sauce-02.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733cd","name":"Соус фирменный Space Sauce","type":"sauce","proteins":50,"fat":22,"carbohydrates":11,"calories":14,"price":80,"image":"https://code.s3.yandex.net/react/code/sauce-04.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png","__v":0}
];
describe('order slice tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(
            initialState
        );
    });

    it("make order success", async () => {
        saveTokens("2", "1");
        fetchMock.postOnce({
                name: "MakeOrderSuccess",
                url: PostOrderUrl,
                headers: {"Authorization": "1"},
                body: {
                    ingredients: [
                        "60d3b41abdacab0026a733c6",
                        "60d3b41abdacab0026a733cb",
                        "60d3b41abdacab0026a733cd"
                    ]
                }
            },
            {
                success: true,
                order: {
                    number: "100500"
                }
            } as MakeOrderResult
        );

        const result = await store.dispatch(makeOrderAsync([ingredients[0], ingredients[2], ingredients[4]]));
        const makeOrderResponse = result.payload as MakeOrderResult;

        expect(result.type).toBe("order/makeOrder/fulfilled");
        expect(makeOrderResponse.success).toEqual(true);

        const state = store.getState();
        expect(state.order.number).toEqual("100500");
        expect(state.order.error).toEqual("");
        expect(state.order.status).toEqual("idle");
    });

    it("make order failed", async () => {
        const result = await store.dispatch(makeOrderAsync([ingredients[4]]));

        expect(result.type).toBe("order/makeOrder/rejected");

        const state = store.getState();
        expect(state.order.number).toEqual(null);
        expect(state.order.error).toEqual("Бургег без булок - не бургер!");
        expect(state.order.status).toEqual("failed");
    });

    it("get order success", async () => {
        const order: Order = {
            _id: "1",
            number: 100500,
            status: "done",
            name: "Тест",
            createdAt: "1",
            updateAt: "2",
            ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733cb", "60d3b41abdacab0026a733cd"]
        }

        fetchMock.getOnce({
                name: "GetOrderSuccess",
                url: `${GetOrderUrl}100500`
            },
            {
                success: true,
                orders: [ order ]
            } as GetOrderResult
        );

        const result = await store.dispatch(getOrderAsync("100500"));
        const getOrderResponse = result.payload as GetOrderResult;

        expect(result.type).toBe("order/getOrder/fulfilled");
        expect(getOrderResponse.success).toEqual(true);

        const state = store.getState();
        expect(state.order.details).toEqual(order);
        expect(state.order.error).toEqual("");
        expect(state.order.status).toEqual("idle");
    });
})