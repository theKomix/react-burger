import {Ingredient} from "../../models/ingredient";
import {PostOrderUrl} from "../api-urls";
import {fetchWithRefresh, getAccessToken} from "../utils";

export interface MakeOrderResult {
  name: string,
  order: {
    number: string | null
  },
  success: boolean
}

export async function MakeOrder(order: Ingredient[]): Promise<MakeOrderResult> {
  if (order.length === 0 || !order.some(i => i.type === "bun")) {
    throw new Error("Бургег без булок - не бургер!");
  }
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json;charset=utf-8");
  requestHeaders.set("Authorization", getAccessToken());

  return fetchWithRefresh(PostOrderUrl, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({"ingredients": order.map(i => i._id)})
  })
      .then(data => data as Promise<MakeOrderResult>)
}
