export interface Order {
    readonly _id: string;
    readonly status: OrderStatusType;
    readonly name: string;
    readonly number: number;
    readonly createdAt: string;
    readonly updateAt: string;
    readonly ingredients: string[];
}

export type OrderStatusType = "created" | "pending" | "done" | "canceled";