import React from "react";
import { useParams } from "react-router-dom";
import { OrderDetails } from "../components/orders/order-details/order-details";
import {useAppDispatch, useAppSelector} from "../hooks";
import {NotFound404} from "./not-found";
import {getOrderAsync, selectOrder} from "../services/order/order-slice";
import styles from "./user-forms.module.css";
import loading from "../images/loading.gif";

export const OrderDetailsPage: React.FC<{
    showHeader?: boolean;
}> = ( { showHeader = false } ) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const orderState = useAppSelector(selectOrder);

    React.useEffect(() => {
        if (id) {
            dispatch(getOrderAsync(id));        }
    }, [dispatch, id]);

    if (!id ){
        return <NotFound404/>;
    }

    return (
        <>
            {orderState.status === 'loading' && <img src={loading} alt="Загрузка" className={styles.loading}/>}
            {orderState.status === 'idle' && (orderState.details ?
                <OrderDetails order={orderState.details!} showHeader={showHeader}/>
                : <NotFound404/>)
            }
        </>
    );
}
