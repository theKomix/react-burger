import React, {Dispatch}  from "react";
import {Ingredient} from "../models/ingredient";

export type Order = {
    sum: number|null;
    number: string|null;
    ingredients: Ingredient[];
    error: string|null;
}

export enum OrderActionType {
    ADD = 'ADD_INGREDIENT',
    REMOVE = 'REMOVE_INGREDIENT',
    MAKE = 'MAKE_ORDER',
    SET = 'SET_INGREDIENT_LIST',
    ERROR = 'SET_ERROR',
}

type ActionChangePayload = {
    type: OrderActionType.ADD | OrderActionType.REMOVE,
    payload: Ingredient
}

type ActionSetPayload = {
    type: OrderActionType.SET,
    payload: Ingredient[]
}

type ActionMakePayload = {
    type: OrderActionType.MAKE,
    payload: string
}

type ActionSetErrorPayload = {
    type: OrderActionType.ERROR,
    payload: string|null
}

export type OrderAction = ActionChangePayload | ActionSetPayload | ActionMakePayload | ActionSetErrorPayload

export type OrderContextState = {
    state: Order;
    changeState: Dispatch<OrderAction>;
}

export const InitialOrderState = {sum: null, number: null, ingredients: [], error: null} as Order;

export const OrderContext = React.createContext<OrderContextState>({
    state: InitialOrderState,
    changeState: (state) => state});
