import React from 'react';
import headerStyles from './order-feed-item.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {OrderFeedItem as Item} from "../../../services/order-feed/order-feed-slice";

export const OrderFeedItem : React.FC<{item: Item}> = ({item}) => {
    return (
        <div>
            <div>{item._id}</div>
            <div>{item.status}</div>
            <div>{item.number}</div>
            <div>{item.createdAt}</div>
            <div>{item.updateAt}</div>
        </div>
    )
}
