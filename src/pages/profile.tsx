import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../hooks";
import {selectUser} from "../services/user/user-slice";
import styles from "./user-forms.module.css";

export function ProfilePage() {
    const user = useAppSelector(selectUser);
    const navLinkClassName = `${styles.sidebarItem} text text_type_main-medium`;



    return (
        <>
            <div className={styles.sidebar}>
                <NavLink to="/profile"
                         className={({isActive}) => isActive ? `${navLinkClassName} ${styles.sidebarItemActive}` : navLinkClassName}>Профиль</NavLink>
                <NavLink to="/"
                         className={({isActive}) => isActive ? `${navLinkClassName} ${styles.sidebarItemActive}` : navLinkClassName}>История
                    заказов</NavLink>
                <NavLink to="/logout" className={navLinkClassName}>Выход</NavLink>
                <span className="text text_type_main-small">В этом разделе Вы можете <br/>изменить свои персональные данные</span>
            </div>
            <div className={styles.container}>
                <Input type={'text'}
                       placeholder={'Имя'}
                       onChange={() => {
                       }}
                       value={user?.name || ""}
                       icon="EditIcon"
                       name={'name'}
                       error={false}
                       errorText={'Ошибка'}
                       size={'default'}/>
                <Input type={'email'}
                       placeholder={'Логин'}
                       onChange={() => {
                       }}
                       value={user?.email || ""}
                       icon="EditIcon"
                       name={'email'}
                       error={false}
                       errorText={'Ошибка'}
                       size={'default'}/>
                <Input type={'password'}
                       placeholder={'Пароль'}
                       onChange={() => {
                       }}
                       value=""
                       icon="EditIcon"
                       name={'password'}
                       error={false}
                       errorText={'Ошибка'}
                       size={'default'}/>
            </div>
        </>
    );
}
