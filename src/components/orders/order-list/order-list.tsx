import React from 'react';
import {useAppSelector} from "../../../hooks";
import {selectOrderList} from "../../../services/order-feed/order-feed-slice";
import {OrderListItem} from "../order-list-item/order-list-item";
import styles from './order-list.module.css';

export const OrderList : React.FC<{showState?: boolean}> = ({showState= false}) => {
    const orderList = useAppSelector(selectOrderList);

    return (
        <div className={styles.container}>
            {orderList.orders.map((item) =>
                <OrderListItem key={item._id} item={item} showState={showState}/>)}
        </div>
    )
}
