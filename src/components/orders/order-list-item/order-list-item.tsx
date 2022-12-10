import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../../hooks";
import {Order} from "../../../models/order";
import {selectIngredients} from "../../../services/app/app-slice";
import styles from './order-list-item.module.css';
import {Link, useLocation} from 'react-router-dom';
import {getBeautyDate} from "../../../services/utils";
import {OrderStatus} from "../order-status/order-status";

export const OrderListItem : React.FC<{item: Order, showState?: boolean}> = ({item, showState= false}) => {
    const location = useLocation();
    const ingredients = useAppSelector(selectIngredients);

    const getIngredients = () => {
        const ings = item.ingredients.map(id => ingredients.find(x => x._id === id)!);
        const sum = ings.reduce((partialSum, a) => (partialSum + a.price), 0);
        const slicedIngs = ings.slice(0, 6);
        let residual = ings.length - slicedIngs.length;

        return <>
            <div>
                {slicedIngs.map((ing, index) =>
                    <div key={index}>
                        <div  className={styles.imageWrapper} style={{zIndex: `${10-index}`, left: `${24 + index*48}px`}}/>
                        <div className={styles.image} style={{zIndex: `${10-index}`, left: `${26 + index*48}px`}}>
                            {<img src={ing.image_mobile} alt={ing.name} />}
                        </div>
                    </div>
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

    return (
        <Link
            to={`${item.number}`}
            state={{background: location}}
            className={styles.link}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="text text_type_digits-default">#{item.number}</span>
                    <span className={`text text_color_inactive text_type_main-default`}>{getBeautyDate(new Date(item.createdAt))}</span>
                </div>
                <div className={`${styles.name}`}>
                    <span className="text text_type_main-medium">{item.name}</span>
                    {showState && <OrderStatus status={item.status}/>}
                </div>
                <div className={styles.orderDetails}>{getIngredients()}</div>
            </div>
        </Link>
    )
}
