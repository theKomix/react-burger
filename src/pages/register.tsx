import {Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './user-forms.module.css';
import {Link, Navigate} from "react-router-dom";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    registerUserAsync,
    selectError,
    selectRegistration,
    selectStatus,
    selectUser,
    updateRegistrationField
} from "../services/user/user-slice";
import loading from '../images/loading.gif';

export function RegisterPage() {
    const [nameError, setNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const user = useAppSelector(selectUser);
    const registration = useAppSelector(selectRegistration);
    const userError = useAppSelector(selectError);
    const registerStatus = useAppSelector(selectStatus);

    const dispatch = useAppDispatch();

    const clearErrors = () => {
        setNameError("");
        setPasswordError("");
        setEmailError("");
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let hasErrors = false;
        if (!registration.name) {
            setNameError("Введите имя");
            hasErrors = true;
        }
        if (!registration.password) {
            setPasswordError("Введите пароль");
            hasErrors = true;
        }
        if (!registration.email) {
            setEmailError("Введите e-mail");
            hasErrors = true;
        }
        if (hasErrors) {
            return
        }
        setSubmitted(true);
        dispatch(registerUserAsync(registration));
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            { submitted && user && <Navigate to="/" replace={true} />}
            { registerStatus === "idle" && user && <Navigate to="/profile" replace={true} />}
            <h1 className="text text_type_main-medium">Регистрация</h1>
            {registerStatus === "loading" ? <img className={`${styles.done} mt-15 mb-15`} src={loading} alt="done"/>
                : <><Input type="text"
                           placeholder="Имя"
                           onChange={(e) => {
                               dispatch(updateRegistrationField({fieldName: "name", fieldValue: e.target.value}));
                               clearErrors()
                           }}
                           value={registration.name}
                           name="name"
                           error={!!nameError}
                           errorText={nameError}/>
                    <div className={styles.inputContainer}>
                        <EmailInput
                            placeholder="E-mail"
                            onChange={(e) => {
                                dispatch(updateRegistrationField({fieldName: "email", fieldValue: e.target.value}));
                                clearErrors()
                            }}
                            value={registration.email}
                            name="email"/>
                        {!!emailError &&
                            <span className={`${styles.error} text text_type_main-small`}>{emailError}</span>}
                    </div>
                    <div className={styles.inputContainer}>
                        <PasswordInput
                            placeholder="Пароль"
                            onChange={(e) => {
                                dispatch(updateRegistrationField({fieldName: "password", fieldValue: e.target.value}));
                                clearErrors()
                            }}
                            value={registration.password}
                            name="password"/>
                        {registerStatus === "failed" ?
                            <span className={`${styles.error} text text_type_main-small`}>{userError}</span>
                            : (!!passwordError) &&
                            <span className={`${styles.error} text text_type_main-small`}>{passwordError}</span>
                        }
                    </div>
                    <Button type="primary" size="medium" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </>
            }
            <span className="text text_type_main-small mt-15">Уже зарегистрированы? <Link to="/login"
                                                                                          className={styles.link}>Войти</Link></span>
        </form>
    );
}