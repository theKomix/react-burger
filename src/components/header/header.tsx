import React from 'react';
import headerStyles from './header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

export function Header() {
    const className = `${headerStyles.menuItem} text text_type_main-default pl-4 pr-4 pt-5 pb-5`;

    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.content}>
                <div className={headerStyles.navigation}>
                    <NavLink to="/" className={className}>
                        {({ isActive }) => (
                            <span className={isActive ? headerStyles.menuItemActive : undefined}>
                                <BurgerIcon type={isActive ? "primary": "secondary" }/>
                                Конструктор
                            </span>
                            )}
                    </NavLink>
                    <NavLink to="/orders" className={className}>
                        {({ isActive }) => (
                            <span className={isActive ? headerStyles.menuItemActive : undefined}>
                                <ListIcon type={isActive ? "primary": "secondary" }/>
                                Лента заказов
                            </span>
                        )}
                    </NavLink>
                </div>
                <div className={headerStyles.logo}>
                    <Logo/>
                </div>
                <div className={headerStyles.menuProfile}>
                    <NavLink to="/profile" className={className}>
                        {({ isActive }) => (
                            <span className={isActive ? headerStyles.menuItemActive : undefined}>
                                <ProfileIcon type={isActive ? "primary": "secondary" }/>
                                Личный кабинет
                            </span>
                        )}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}