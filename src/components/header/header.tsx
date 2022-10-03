import * as React from 'react';
import headerStyles from './header.module.css';
import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export interface HeaderProps {
    className?: string
    children: React.ReactNode
}

export function Header() {
    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.content}>
                <div className={headerStyles.navigation}>
                    <Button htmlType="button" type="secondary" extraClass={`${headerStyles.menuItem} ${headerStyles.menuItemActive} pl-4 pr-4 pt-5 pb-5`}>
                        <BurgerIcon type="primary"/>
                        Конструктор
                    </Button>
                    <Button htmlType="button" type="secondary" extraClass={`${headerStyles.menuItem} pl-4 pr-4 pt-5 pb-5`}>
                        <ListIcon type="secondary"/>
                        Лента заказов
                    </Button>
                </div>
                <div className={headerStyles.logo}>
                    <Logo/>
                </div>
                <Button htmlType="button" type="secondary" extraClass={`${headerStyles.menuProfile} pl-4 pr-4 pt-5 pb-5`}>
                    <ProfileIcon type="secondary"/>
                    Личный кабинет
                </Button>
            </div>
        </div>
    )
}