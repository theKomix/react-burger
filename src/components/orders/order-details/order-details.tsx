import * as React from "react";
import { Order } from "../../../models/order";
import {useAppSelector} from "../../../hooks";
import {selectIngredients} from "../../../services/app/app-slice";
import {OrderStatus} from "../order-status/order-status";
import styles from "./order-details.module.css";
import {getBeautyDate, groupBy} from "../../../services/utils";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails: React.FC<{
    order: Order;
    showHeader?: boolean;
}> = ( {order, showHeader= false} ) => {
    const ingredients = useAppSelector(selectIngredients);
    const ings = order.ingredients.map(id => ingredients.find(x => x._id === id)!);
    const sum = ings.reduce((partialSum, a) => (partialSum + a.price), 0);
    const items = groupBy(ings, i => i._id);

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <span className={`${showHeader ? styles.headerOffset: styles.header} text text_type_digits-default`}>#{order.number}</span>
                <span className={`${styles.left} text text_type_main-medium mt-6`}>#{order.name}</span>
                <span className={`${styles.left} mb-1`}><OrderStatus status={order.status}/></span>
                <span className={`${styles.left} text text_type_main-medium mt-10 mb-2`}>Состав:</span>
                <div className={styles.compound}>
                    {Object.keys(items).map((item) => <div key={item} className={styles.item}>
                        <div className={styles.imageName}>
                            <div className={styles.imageContainer}>
                                <div  className={styles.imageWrapper} />
                                <div className={styles.image} >
                                    {<img src={items[item][0].image_mobile} alt={items[item][0].name} />}
                                </div>
                            </div>
                            <span className="text text_type_main-medium">{items[item][0].name}</span>
                        </div>
                        <div className={`${styles.sum} ml-4 mr-6`}>
                            <span className="text text_type_digits-default">{items[item].length}</span>
                            <span className="text text_type_digits-default">x</span>
                            <span className="text text_type_digits-default">{items[item][0].price}</span>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div> )}
                </div>
                <div className={`${styles.footer} mt-6`}>
                    <span className="text text_type_main-default text_color_inactive">{getBeautyDate(new Date(order.createdAt))}</span>
                    <div className={styles.sum}><span className="text text_type_digits-default">{sum}</span><CurrencyIcon type="primary"/></div>
                </div>
            </div>
        </div>
    );
};
