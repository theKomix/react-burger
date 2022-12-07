import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../../hooks";
import {Order} from "../../../models/order";
import {selectIngredients} from "../../../services/app/app-slice";
import styles from './order-list-item.module.css';

export const OrderListItem : React.FC<{item: Order, showState?: boolean}> = ({item, showState= false}) => {
    const ingredients = useAppSelector(selectIngredients);

    const getOrderBeautyDate = () => {
        const now = new Date();
        const date = new Date(item.createdAt);
        const time = `${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        const daysDiff = now.getDate() - date.getDate();
        if (daysDiff === 0) {
            return `Сегодня, ${time}`;
        }
        if (daysDiff === 1) {
            return `Вчера, ${time}`;
        }
        if (daysDiff < 5) {
            return `${daysDiff} дня назад, ${time}`;
        }
        if (daysDiff <= 7) {
            return `${daysDiff} дней назад, ${time}`;
        }
        return `${date.toLocaleDateString()}, ${time}`;
    };

    const getIngredients = () => {
        const ings = item.ingredients.map(id => ingredients.find(x => x._id === id)!);
        const sum = ings.reduce((partialSum, a) => (partialSum + a.price), 0);
        const slicedIngs = ings.slice(0, 6);
        let residual = ings.length - slicedIngs.length;
        return <>
            <div>
                {slicedIngs.map((ing, index) =>
                    <>
                        <div key={index} className={styles.imageWrapper} style={{zIndex: `${10-index}`, left: `${24 + index*48}px`}}/>
                        <div className={styles.image} style={{zIndex: `${10-index}`, left: `${26 + index*48}px`}}>
                            {<img src={ing.image_mobile} alt={ing.name} />}
                        </div>
                    </>
                )
                }
                {residual > 0 && <>
                    <div className={styles.lastIngredientFade} />
                    <div className={`${styles.lastIngredientResidual} text text_type_digits-default`}>
                        +{residual}
                    </div>
                </>}
            </div>
            <div className={`${styles.orderSum} text text_type_digits-medium`}>
                {sum}<CurrencyIcon type="primary"/>
            </div>
        </>
    }

    const getStatus = () => {
        switch (item.status){
            case "created":
                return "Создан";
            case "pending":
                return "Готовится";
            case "done":
                return <span className={styles.statusDone}>Выполнен</span>;
            case "canceled":
                return <span className={styles.statusCancel}>Отменен</span>;
        }
        return <></>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className="text text_type_digits-default">#{item.number}</span>
                <span className={`text text_color_inactive text_type_main-default`}>{getOrderBeautyDate()}</span>
            </div>
            <div className={`${styles.name} text`}>
                <span className="text_type_main-medium">{item.name}</span>
                {showState && <span>
                    {getStatus()}
                </span>}
            </div>
            <div className={styles.orderDetails}>{getIngredients()}</div>
        </div>
    )
}
