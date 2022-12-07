import {Order} from "./order";

export interface OrderList  {
    orders: Order[];
    total: number;
    totalToday: number;
}