import {Ingredient} from "../models/ingredient";
import {GetIngredientsUrl} from "./api-urls";

export async function GetIngredients(): Promise<Ingredient[]> {
    return fetch(GetIngredientsUrl).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<{ data: Ingredient[] }>
    }).then(data => data.data)
}