import styles from "./profile.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

export function ProfilePage() {
    const navLinkClassName = `${styles.sidebarItem} text text_type_main-medium`;
    return (
        <>
            <div className={styles.sidebar}>
                <NavLink to="/profile" className={({isActive}) => isActive ? `${navLinkClassName} ${styles.sidebarItemActive}`: navLinkClassName}>Профиль</NavLink>
                <NavLink to="/" className={({isActive}) => isActive ? `${navLinkClassName} ${styles.sidebarItemActive}`: navLinkClassName}>История заказов</NavLink>
                <NavLink to="/" className={({isActive}) => isActive ? `${navLinkClassName} ${styles.sidebarItemActive}`: navLinkClassName}>Выход</NavLink>
                <span className="text text_type_main-small">В этом разделе Вы можете <br/>изменить свои персональные данные</span>
            </div>
            <div className={styles.container}>
                <Input type={'text'}
                       placeholder={'Имя'}
                       onChange={() => {
                       }}
                       value=""
                       icon="EditIcon"
                       name={'name'}
                       error={false}
                       errorText={'Ошибка'}
                       size={'default'}/>
                <Input type={'email'}
                       placeholder={'Логин'}
                       onChange={() => {
                       }}
                       value=""
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