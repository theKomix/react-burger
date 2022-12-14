import reducer, { initialState, getIngredientsAsync } from "./app-slice";
import fetchMock from 'fetch-mock';
import {GetIngredientsUrl} from "../api-urls";
import {store} from "../store";

describe('app slice tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(
            initialState
        );
    });

    it("get ingredients success", async () => {
        const ingredients = [
            {
                "_id": "60d3b41abdacab0026a733c6",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            }, {
                "_id": "60d3b41abdacab0026a733c7",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            }];

        fetchMock.getOnce({
                name: "GetIngredientsSuccess",
                url: GetIngredientsUrl
            },
            {
                success: true,
                data: ingredients
            }
        );

        const result = await store.dispatch(getIngredientsAsync());

        expect(result.type).toBe("app/getIngredients/fulfilled");

        const state = store.getState();
        expect(state.app.ingredients).toEqual(ingredients);

        expect(state.app.error).toEqual("");
        expect(state.app.status).toEqual("idle");
    });
})