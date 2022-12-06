import * as React from 'react';
import { useDrop } from 'react-dnd';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderConfirmation } from "./order-confirmation/order-confirmation";
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
    addIngredient,
    selectCart
} from '../../services/cart/cart-slice';
import { makeOrderAsync } from '../../services/order/order-slice';
import { selectIngredients } from "../../services/app/app-slice";
import { Bun } from './bun/bun';
import { IngredientCard } from './ingredient/ingredient-card';
import styles from './burger-constructor.module.css';
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../services/user/user-slice";


export const BurgerConstructor: React.FC = () => {
    const user = useAppSelector(selectUser);
    const cartState = useAppSelector(selectCart);
    const ingredients = useAppSelector(selectIngredients);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [orderDetailsShow, setOrderDetailsShow] = React.useState<boolean>(false);

    const makeOrder = () => {
        if (!user) {
            navigate("/login");
        }
        dispatch(makeOrderAsync(cartState.items.map(x => x.ingredient)));
        setOrderDetailsShow(true);
    };

    const onDetailsClose = () => {
        setOrderDetailsShow(false);
    };

    const [{isHover}, ingredientsTarget] = useDrop({
        accept: 'ingredients',
        drop(item: { id: string }) {
            const newIng = ingredients.find(x => x._id === item.id);
            if (newIng) {
                dispatch(addIngredient(newIng));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const bun = cartState.items.find(i => i.ingredient.type === "bun")?.ingredient;
    const innerIngredients = cartState.items.filter(i => i.ingredient.type !== "bun");

    return (
        <div className={`${styles.content} pt-25`}>
            <div className={styles.ingredients}>
                <Bun bun={bun} isTop={true}/>

                {innerIngredients.length ?
                    <div className={`${styles.customContent} mt-4 mb-4`}>
                        {innerIngredients.map((item) =>
                            <IngredientCard key={item.id} item={item} />)}
                    </div>
                    : <div className={`${styles.dropContent} ${isHover && styles.hover}`} ref={ingredientsTarget}>
                        <span className="text text_type_main-medium">Перетащите сюда ингредиенты</span>
                    </div>}
                <Bun bun={bun} isTop={false}/>
            </div>
            <div className={`${styles.orderPrice} mt-10`}>
                <span className="text text_type_digits-medium pr-2">{cartState.sum ?? 0}</span>
                <CurrencyIcon type="primary"/>
                <Button htmlType="button" extraClass="ml-10 mr-8" onClick={makeOrder}>Оформить заказ</Button>
            </div>
            <OrderConfirmation onClose={onDetailsClose} show={orderDetailsShow}/>
        </div>
    )
}
