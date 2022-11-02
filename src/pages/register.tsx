import {Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import {Link} from "react-router-dom";

export function RegisterPage() {
    return (
        <form className={styles.container}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input type={'text'}
                   placeholder={'Имя'}
                   onChange={() => {}}
                   value=""
                   name={'name'}
                   error={false}
                   errorText={'Ошибка'}
                   size={'default'}/>
            <EmailInput
                   placeholder={'E-mail'}
                   onChange={() => {}}
                   value=""
                   name={'email'}
                   size={'default'}/>
            <PasswordInput
                   placeholder={'Пароль'}
                   onChange={() => {}}
                   value=""
                   name={'password'}
                   size={'default'}/>
            <Button type="primary" size="medium" htmlType="submit">
                Зарегистрироваться
            </Button>
            <span className="text text_type_main-small mt-15">Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link></span>
        </form>
    );
}