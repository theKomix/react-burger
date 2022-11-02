import styles from "./reset-password.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function ResetPasswordPage() {
    return (
        <form className={styles.container}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={() => {}}
                value=""
                name={'password'}
                size={'default'}/>
            <Input type={'text'}
                   placeholder={'Введите код из письма'}
                   onChange={() => {}}
                   value=""
                   name={'code'}
                   error={false}
                   errorText={'Ошибка'}
                   size={'default'}/>
            <Button type="primary" size="medium" htmlType="submit">
                Сохранить
            </Button>
            <span className="text text_type_main-small mt-15">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></span>
        </form>
    );
}