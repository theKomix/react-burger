import styles from "./user-forms.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import {StartResetPassword} from "../services/user/user-api";

export function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Введите e-mail")
            return;
        }
        try {
            const result = await StartResetPassword(email);
            if(!result) {
                setError("Пользователь с таким e-mail не найден");
            }
            else {
                navigate("/reset-password", {state: {email}});
            }
        } catch {
            setError("Ой, произошла ошибка!");
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <div className={styles.inputContainer}>
                <EmailInput
                    placeholder="E-mail"
                    onChange={(e) => { setEmail(e.target.value); setError("")}}
                    value={email}
                    name="email"
                    size="default" />
                {!!error && <span className={`${styles.error} text text_type_main-small`}>{error}</span>}
            </div>
            <Button type="primary" size="medium" htmlType="submit">
                Восстановить
            </Button>
            <span className="text text_type_main-small mt-15">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></span>
        </form>
    );
}
