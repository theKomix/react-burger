import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks";
import {selectUser} from "../../services/user/user-slice";
import styles from "../user-forms.module.css";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";

export function ProfilePage() {
    const user = useAppSelector(selectUser);

    return (
        <>
            <ProfileMenu/>
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
