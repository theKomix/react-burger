import {Order} from "./order";

export interface OrderList  {
    success: boolean;
    message: string;
    orders: Order[];
    total: number;
    totalToday: number;
}