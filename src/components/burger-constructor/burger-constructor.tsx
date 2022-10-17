import * as React from 'react';
import {Ingredient} from "../../models/ingredient";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderDetails} from "./order-details/order-details";
import {OrderActionType, OrderContext} from "../../context/order-context";
import styles from './burger-constructor.module.css';
import {MakeOrder} from "../../services/make-order";

export const BurgerConstructor: React.FC = () => {
    const {state, changeState} = React.useContext(OrderContext);
    const [orderDetailsShow, setOrderDetailsShow] = React.useState<boolean>(false);

    const makeOrder = () => {
        MakeOrder(state.ingredients).then(result => {
            if (result.success) {
                changeState({type: OrderActionType.MAKE, payload: result.order.number!});
                setOrderDetailsShow(true);
            }
            else {
                changeState({
                        type: OrderActionType.ERROR,
                        payload: "При создании заказа произошла ошибка, перезагрузите страницу..."
                    }
                );
            }
        }).catch(() => {
            changeState({
                type: OrderActionType.ERROR,
                payload: "При создании заказа произошла ошибка, перезагрузите страницу..."}
            );
        });
    };

    const onDetailsClose = () => {
        setOrderDetailsShow(false);
    };

    const removeItem = (item: Ingredient) => {
        changeState({type: OrderActionType.REMOVE, payload: item});
    };

    let bun = state?.ingredients.find(i => i.type === "bun");
    let ingredients = (state?.ingredients ?? []).filter(i => i.type !== "bun")

    return (
        <div className={`${styles.content} pt-25`}>
            <div className={styles.ingredients}>
                <div className="pl-8">
                    {bun && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun?.name + " (верх)"}
                        price={bun?.price ?? 0}
                        thumbnail={bun?.image ?? ""}
                        extraClass={`${styles.item}`}
                    />}
                </div>
                <div className={`${styles.customContent} mt-4 mb-4`}>
                    {ingredients.map((item, index) =>
                        <div key={index} className={styles.element}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                extraClass={styles.item}
                                handleClose={() => removeItem(item)}
                            />
                        </div>)}
                </div>
                {bun && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun?.name + " (низ)"}
                    price={bun?.price ?? 0}
                    thumbnail={bun?.image ?? ""}
                    extraClass={`${styles.item} ml-8`}
                />}
            </div>
            <div className={`${styles.orderPrice} mt-10`}>
                <span className="text text_type_digits-medium pr-2">{state?.sum ?? 0}</span>
                <CurrencyIcon type="primary"/>
                <Button htmlType="button" extraClass="ml-10 mr-8" onClick={makeOrder}>Оформить заказ</Button>
            </div>
            <OrderDetails onClose={onDetailsClose} orderNumber={state.number!} show={orderDetailsShow}/>
        </div>
    )
}