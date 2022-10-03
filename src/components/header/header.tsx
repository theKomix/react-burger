import * as React from 'react';
import headerStyles from './header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export interface HeaderProps {
    className?: string
    children: React.ReactNode
}

export function Header() {
    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.content}>
                <div className={headerStyles.navigation}>
                    <a className={`${headerStyles.menuItem} ${headerStyles.menuItemActive} text text_type_main-default`} href="#">
                        <BurgerIcon type="primary"/>
                        Конструктор
                    </a>
                    <a className={`${headerStyles.menuItem} text text_type_main-default`} href="#">
                        <ListIcon type="secondary"/>
                        Лента заказов
                    </a>
                </div>
                <div className={headerStyles.logo}>
                    <Logo/>
                </div>
                <div className={headerStyles.menuProfile}>
                    <a className={`${headerStyles.menuItem} text text_type_main-default`} href="#">
                        <ProfileIcon type="secondary"/>
                        Личный кабинет
                    </a>
                </div>
            </div>
        </div>
    )
}