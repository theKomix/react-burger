import styles from "./user-forms.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {ResetPassword} from "../services/user/user-api";

export function ResetPasswordPage() {
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [tokenError, setTokenError] = useState<string>("");
    const navigate = useNavigate();
    const { state } = useLocation();

    const clearErrors = () => {
        setPasswordError("");
        setTokenError("");
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let hasErrors = false;
        if (!password) {
            setPasswordError("Введите пароль");
            hasErrors = true;
        }
        if (!token) {
            setTokenError("Введите код из письма");
            hasErrors = true;
        }
        if(hasErrors) {
            return
        }
        try {
            const result = await ResetPassword(password, token);
            if(!result) {
                setTokenError("Ой, произошла ошибка!");
            }
            else {
                navigate("/login");
            }
        } catch {
            setTokenError("Ой, произошла ошибка!");
        }
    }

    if(!state || !state.email) {
        return <Navigate to="/forgot-password" replace={true} />;
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <div style={{textAlign: "left"}}>
                <PasswordInput
                    placeholder="Введите новый пароль"
                    onChange={(e) => { setPassword(e.target.value); clearErrors()}}
                    value={password}
                    name="password"
                    size="default"/>
                {!!passwordError && <span className={`${styles.error} text text_type_main-small`}>{passwordError}</span>}
            </div>
            <Input type="text"
                   placeholder="Введите код из письма"
                   onChange={(e) => { setToken(e.target.value); clearErrors()}}
                   value={token}
                   name="code"
                   error={!!tokenError}
                   errorText={tokenError}
                   size={'default'}/>
            <Button type="primary" size="medium" htmlType="submit">
                Сохранить
            </Button>
            <span className="text text_type_main-small mt-15">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></span>
        </form>
    );
}