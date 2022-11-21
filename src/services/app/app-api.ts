import {Ingredient} from "../../models/ingredient";
import {GetIngredientsUrl} from "../api-urls";
import {checkResponse} from "../utils";

export async function GetIngredients(): Promise<Ingredient[]> {
    return fetch(GetIngredientsUrl)
        .then(checkResponse)
        .then(data => data.data as Promise<Ingredient[]>)
}
