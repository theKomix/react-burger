import React from 'react';
import headerStyles from './order-feed.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {connect, disconnect, selectOrderFeed} from "../../services/order-feed/order-feed-slice";
import {IngredientCard} from "../burger-constructor/ingredient/ingredient-card";
import {OrderFeedItem} from "./order-feed-item/order-feed-item";

export const OrderFeed : React.FC<{endPoint: string}> = ({endPoint}) => {
    const className = `${headerStyles.menuItem} text text_type_main-default pl-4 pr-4 pt-5 pb-5`;
    const dispatch = useAppDispatch();
    const orderFeed = useAppSelector(selectOrderFeed);

    React.useEffect(() => {
        dispatch(connect({url: endPoint, token: ""}));
        return () => { dispatch(disconnect()) };
    }, [dispatch]);

    return (
        <div>
            {orderFeed.items.map((item) =>
                <OrderFeedItem key={item._id} item={item} />)}
        </div>
    )
}
