import styles from "./forgot-password.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function ForgotPasswordPage() {
    return (
        <form className={styles.container}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <EmailInput
                placeholder={'E-mail'}
                onChange={() => {}}
                value=""
                name={'email'}
                size={'default'}/>
            <Button type="primary" size="medium" htmlType="submit">
                Восстановить
            </Button>
            <span className="text text_type_main-small mt-15">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></span>
        </form>
    );
}