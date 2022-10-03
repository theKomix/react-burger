import * as React from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../models/ingredient";

export const BurgerConstructor: React.FC<{
    topBun: Ingredient | null;
    bottomBun: Ingredient | null;
    list: Ingredient[];}> = ({ topBun= null, bottomBun= null, list }) => {

    const getOrderSum = () => {
        return [topBun, bottomBun, ...list].map(item => item?.price ?? 0)
            .reduce((partialSum, a) => partialSum + a, 0);
    }

    return (
        <div className={`${styles.content} pt-25`}>
            <div className={styles.ingredients}>
                <div className="pl-8">
                    {topBun && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={topBun?.name + " (верх)"}
                        price={topBun?.price ?? 0}
                        thumbnail={topBun?.image ?? ""}
                        extraClass={`${styles.item}`}
                    />}
                </div>
                <div className={`${styles.customContent} mt-4 mb-4`}>
                    {list.map(item =>
                        <div key={item._id} className={styles.element}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                extraClass={styles.item}
                            />
                        </div>)}
                </div>
                {bottomBun && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bottomBun?.name + " (низ)"}
                    price={bottomBun?.price ?? 0}
                    thumbnail={bottomBun?.image ?? ""}
                    extraClass={`${styles.item} ml-8`}
                />}
            </div>
            <div className={`${styles.orderPrice} mt-10`}>
                <span className="text text_type_digits-medium pr-2">{getOrderSum()}</span>
                <CurrencyIcon type="primary"/>
                <Button htmlType="button" extraClass="ml-10 mr-8">Оформить заказ</Button>
            </div>
        </div>
    )
}