import {Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './user-forms.module.css';
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {RegisterUser} from "../services/user/user-api";

export function RegisterPage() {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [nameError, setNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const navigate = useNavigate();

    const clearErrors = () => {
        setNameError("");
        setPasswordError("");
        setEmailError("");
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let hasErrors = false;
        if (!name) {
            setNameError("Введите имя");
            hasErrors = true;
        }
        if (!password) {
            setPasswordError("Введите пароль");
            hasErrors = true;
        }
        if (!email) {
            setEmailError("Введите e-mail");
            hasErrors = true;
        }
        if(hasErrors) {
            return
        }
        try {
            const result = await RegisterUser(name, email, password);
            if(!result) {
                setPasswordError("Ой, произошла ошибка!");
            }
            else {
                navigate("/login");
            }
        } catch {
            setPasswordError("Ой, произошла ошибка!");
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input type="text"
                   placeholder="Имя"
                   onChange={(e) => {setName(e.target.value); clearErrors()}}
                   value={name}
                   name="name"
                   error={!!nameError}
                   errorText={nameError} />
            <div style={{textAlign: "left"}}>
                <EmailInput
                       placeholder="E-mail"
                       onChange={(e) => {setEmail(e.target.value); clearErrors()}}
                       value={email}
                       name="email" />
                {!!emailError && <span className={`${styles.error} text text_type_main-small`}>{emailError}</span>}
            </div>
            <div style={{textAlign: "left"}}>
                <PasswordInput
                       placeholder="Пароль"
                       onChange={(e) => {setPassword(e.target.value); clearErrors()}}
                       value={password}
                       name="password"/>
                {!!passwordError && <span className={`${styles.error} text text_type_main-small`}>{passwordError}</span>}
            </div>
            <Button type="primary" size="medium" htmlType="submit">
                Зарегистрироваться
            </Button>
            <span className="text text_type_main-small mt-15">Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link></span>
        </form>
    );
}