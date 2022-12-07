export interface Order {
    _id: string;
    status: "created" | "pending" | "done" | "canceled";
    name: string;
    number: number;
    createdAt: string;
    updateAt: string;
    ingredients: string[];
}