import styles from "./login.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function LoginPage() {
    return (
        <form className={styles.container}>
            <h1 className="text text_type_main-medium">Вход</h1>
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
                Войти
            </Button>
            <div className={styles.footer}>
                <span className="text text_type_main-small">Вы – новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link></span>
                <span className="text text_type_main-small">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></span>
            </div>
        </form>
    );
}