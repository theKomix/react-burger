import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import {OrderList} from "../../components/orders/order-list/order-list";
import {
    connect,
    disconnect,
    selectError,
    selectStatus, WebsocketStatus
} from "../../services/order-feed/order-feed-slice";
import {OrdersWsUrl} from "../../services/api-urls";
import {getAccessToken} from "../../services/utils";
import loading from "../../images/loading.gif";
import styles from "./orders.module.css";

export function OrdersPage() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);

    React.useEffect(() => {
        let token = getAccessToken();
        if (token) {
            token = token.replace('Bearer ','');
        }
        dispatch(connect({url: OrdersWsUrl, token: token}));
        return () => { dispatch(disconnect()) };
    }, [dispatch]);

    return (
        <>
            <ProfileMenu/>
            <div className={styles.container}>
                {status === WebsocketStatus.CONNECTING && <img src={loading} alt="Загрузка" className="loading"/>}
                {status === WebsocketStatus.OFFLINE && error && <span className={`${styles.error} text text_type_main-large`}>{error}</span>}
                {status === WebsocketStatus.ONLINE &&
                    <OrderList showState={true}/> }
            </div>
        </>
    );
}
