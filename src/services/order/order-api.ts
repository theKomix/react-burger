import {Ingredient} from "../../models/ingredient";
import { Order } from "../../models/order";
import {GetOrderUrl, PostOrderUrl} from "../api-urls";
import {checkResponse, fetchWithRefresh, getAccessToken} from "../utils";

export interface MakeOrderResult {
  name: string,
  order: {
    number: string | null
  },
  success: boolean
}

export interface GetOrderResult {
  success: boolean;
  orders: Order[];
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

export async function GetOrderByNumber(number: string): Promise<GetOrderResult>  {
  const res = await fetch(`${GetOrderUrl}${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await checkResponse(res).then(data => data as Promise<GetOrderResult>);
}
