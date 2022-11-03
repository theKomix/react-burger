import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {logoutUserAsync, selectError, selectStatus, selectUser} from "../services/user/user-slice";
import styles from "./user-forms.module.css";
import loading from "../images/loading.gif";


export function LogoutPage() {
    const user = useAppSelector(selectUser);
    const logoutStatus = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUserAsync());
    }, [dispatch, navigate]);

    return (
        <>
            {!user && <Navigate to="/" />}
            {logoutStatus === "loading" ?
                <img className={`${styles.done} mt-15 mb-15`} src={loading} alt="done"/>
                : <span className={`${styles.error} text text_type_main-small`}>{error}</span>
            }
        </>
    );
}