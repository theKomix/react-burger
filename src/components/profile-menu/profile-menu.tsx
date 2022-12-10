import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./profile-menu.module.css";

export function ProfileMenu() {
    const navLinkClassName = `${styles.sidebarItem} text text_type_main-medium`;

    return (
        <div className={styles.sidebar}>
            <NavLink to="/profile" end
                     className={({isActive}) => isActive ? `${navLinkClassName} ${styles.sidebarItemActive}` : navLinkClassName}>Профиль</NavLink>
            <NavLink to="/profile/orders"
                     className={({isActive}) => isActive ? `${navLinkClassName} ${styles.sidebarItemActive}` : navLinkClassName}>История
                заказов</NavLink>
            <NavLink to="/logout" className={navLinkClassName}>Выход</NavLink>
            <span className="text text_type_main-small">В этом разделе Вы можете <br/>изменить свои персональные данные</span>
        </div>
    );
}
