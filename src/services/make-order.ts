import {Ingredient} from "../models/ingredient";
import {PostOrderUrl} from "./api-urls";

export interface MakeOrderResult {
    name: string,
    order: {
        number: string | null
    },
    success: boolean
}

export async function MakeOrder(order: Ingredient[]): Promise<MakeOrderResult> {
    return fetch(PostOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"ingredients": order.map(i => i._id)})
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<MakeOrderResult>
    })
}