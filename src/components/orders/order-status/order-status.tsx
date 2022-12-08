import React from "react";
import { OrderStatusType } from "../../../models/order";
import styles from "./order-status.module.css";

export const OrderStatus : React.FC<{status: OrderStatusType}> = ({status}) => {
    let caption = "";
    let className = "";
    switch (status) {
        case "created":
            caption = "Создан";
            break;
        case "pending":
            caption = "Готовится";
            break;
        case "done":
            caption = "Выполнен";
            className = styles.statusDone;
            break;
        case "canceled":
            caption = "Отменен";
            className = styles.statusCancel;
            break;
    }

    return (
        <span className={`${className} text text_type_main-default`}>
            {caption}
        </span>
    )
}
