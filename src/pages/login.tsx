import styles from "./login.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    loginUserAsync,
    selectError,
    selectStatus, selectUser
} from "../services/user/user-slice";
import loading from "../images/loading.gif";

export function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const user = useAppSelector(selectUser);
    const userError = useAppSelector(selectError);
    const loginStatus = useAppSelector(selectStatus);

    const { state } = useLocation();
    const navigate = useNavigate()

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(loginUserAsync({email, password}));
        setSubmitted(true);
    }

    useEffect(() => {
        if (submitted && loginStatus === "idle") {
            if (state && state.from) {
                //
                // реализация redirect на ту страницу, с которой пришел логин
                //
                navigate(state.from);
            } else {
                navigate("/");
            }
        }
    }, [user, submitted, loginStatus, state, navigate]);

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            {user && <Navigate to="/" />}
            <h1 className="text text_type_main-medium">Вход</h1>
            {loginStatus === "loading" ? <img className={`${styles.done} mt-15 mb-15`} src={loading} alt="done"/>
                : <>
                    <EmailInput
                        placeholder={'E-mail'}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        value={email}
                        name={'email'}
                        size={'default'}/>
                    <div className={styles.textLeft}>
                        <PasswordInput
                            placeholder={'Пароль'}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            name={'password'}
                            size={'default'}/>
                        {loginStatus === "failed" &&
                            <span className={`${styles.error} text text_type_main-small`}>{userError}</span>
                        }
                    </div>
                    <Button type="primary" size="medium" htmlType="submit">
                        Войти
                    </Button>
                </>
            }
            <div className={styles.footer}>
                <span className="text text_type_main-small">Вы – новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link></span>
                <span className="text text_type_main-small">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></span>
            </div>
        </form>
    );
}