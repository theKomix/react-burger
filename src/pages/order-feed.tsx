import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {AllOrdersWsUrl} from "../services/api-urls";
import {
    connect,
    disconnect, selectError, selectOrderList,
    selectStatus,
    WebsocketStatus
} from "../services/order-feed/order-feed-slice";
import {OrderList} from "../components/orders/order-list/order-list";
import loading from "../images/loading.gif";
import styles from "./order-feed.module.css";
import appStyles from "../components/app/app.module.css";

export function OrderFeedPage() {
    const dispatch = useAppDispatch();
    const orderList = useAppSelector(selectOrderList);
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);

    React.useEffect(() => {
        dispatch(connect({url: AllOrdersWsUrl, token: ""}));
        return () => { dispatch(disconnect()) };
    }, [dispatch]);

    return (
        <>
            {status === WebsocketStatus.CONNECTING && <img src={loading} alt="Загрузка" className="loading"/>}
            {status === WebsocketStatus.OFFLINE && error && <span className={`${styles.error} text text_type_main-large`}>{error}</span>}
            {status === WebsocketStatus.ONLINE && <>
                <div className={`${appStyles.mainLeftColumn}`}>
                    <p className="text text_type_main-large mt-10 mb-5" style={{textAlign: "left"}}>
                        Лента заказов
                    </p>
                    <OrderList />
                </div>
                <div className={`${appStyles.mainRightColumn} ${styles.container} pt-25`}>
                    <div className={styles.ordersNumbers}>
                        <div>
                            <span className="text text_type_main-medium md-6">Готовы:</span>
                            <div className={styles.readyOrders}>
                                {orderList.orders.filter(x => x.status === "done").map(x =>
                                    <span key={x.number} className="text text_type_digits-small">{x.number}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <span className="text text_type_main-medium md-6">В работе:</span>
                            <div className={styles.pendingOrders}>
                                {orderList.orders.filter(x => x.status === "pending").map(x =>
                                    <span key={x.number} className="text text_type_digits-small">{x.number}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.count}>
                        <span className="text text_type_main-medium">Выполнено за все время:</span>
                        <span className="text text_type_digits-large">{orderList.total}</span>
                    </div>
                    <div className={styles.count}>
                        <span className="text text_type_main-medium">Выполнено за сегодня:</span>
                        <span className="text text_type_digits-large">{orderList.totalToday}</span>
                    </div>
                </div>
            </>}
        </>
    );
}
