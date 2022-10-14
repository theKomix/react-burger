import React from 'react';
import './App.css';
import {Ingredient} from "../../models/ingredient";
import {Header} from "../header/header";
import {BurgerIngredientList} from "../burger-ingredients/burger-ingredient-list/burger-ingredient-list";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {GetIngredients} from "../../services/get-ingredients";
import {Modal} from "../modal/modal";
import {
    InitialOrderState,
    Order,
    OrderAction,
    OrderActionType,
    OrderContext,
    OrderContextState
} from "../../context/order-context";

export const orderReducer = (state: Order, action: OrderAction): Order => {
    const calcOrderSum = (ingredients: Ingredient[]) => {
        return ingredients.reduce(
            (partialSum, a) => (
                partialSum + a.price
            ), 0);
    };

    switch (action.type) {
        case OrderActionType.ADD: {
            let newIngredients = [...state.ingredients, action.payload];
            return {
                ...state,
                sum: calcOrderSum(newIngredients),
                ingredients: newIngredients
            }
        }
        case OrderActionType.REMOVE: {
            let newIngredients = state.ingredients.filter(i => i !== action.payload);
            return {
                ...state,
                sum: calcOrderSum(newIngredients),
                ingredients: [...newIngredients]
            }
        }
        case OrderActionType.SET: {
            return {
                ...state,
                sum: calcOrderSum(action.payload),
                ingredients: [...action.payload]
            }
        }
        case OrderActionType.MAKE: {
            return {
                ...state,
                number: action.payload
            }
        }
        case OrderActionType.ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            throw new Error('Unexpected action');
    }
};

function App() {
    const [listIngredients, setListIngredients] = React.useState<Ingredient[]>([]);
    const [orderState, changeOrderState] = React.useReducer<React.Reducer<Order, OrderAction>>(orderReducer, InitialOrderState);
    const OrderContextState: OrderContextState = {
        state: orderState,
        changeState: changeOrderState
    };

    React.useEffect(() => {
        GetIngredients()
            .then(items => {
                setListIngredients(items);

                //заполнение для теста
                let bun = items.find(i => i.type === "bun")!;
                const notBunIngs = items.filter(i => (i.type !== "bun"));
                changeOrderState({
                    type: OrderActionType.SET,
                    payload: [
                        bun,
                        bun,
                        ...Array.from(Array(7).keys()).map(
                            () => notBunIngs[Math.floor(Math.random() * notBunIngs.length)])]
                });
            })
            .catch(() => {
                changeOrderState({
                    type: OrderActionType.ERROR,
                    payload: "Произошла ошибка, перезагрузите страницу..."
                });
            });
    }, []);

    const onErrorClose = () => {};

    return (
        <div className="App">
            <Header/>
            <OrderContext.Provider value={OrderContextState}>
                <BurgerIngredientList list={listIngredients} />
                <BurgerConstructor />
            </OrderContext.Provider>
            {orderState.error && <Modal onClose={onErrorClose} header={"Ошибка"}><div className="mt-5 text text_type_main-default">{orderState.error}</div></Modal>}
        </div>
    );
}

export default App;
