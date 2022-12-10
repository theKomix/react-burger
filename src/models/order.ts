export interface Order {
    _id: string;
    status: OrderStatusType;
    name: string;
    number: number;
    createdAt: string;
    updateAt: string;
    ingredients: string[];
}

export type OrderStatusType = "created" | "pending" | "done" | "canceled";