import React from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {Header} from "../header/header";
import { getIngredientsAsync } from "../../services/app/app-slice";
import { useAppDispatch } from '../../hooks';
import { Modal } from '../modal/modal';
import {
    ForgotPasswordPage,
    HomePage, IngredientDetailsPage,
    LoginPage, LogoutPage,
    NotFound404,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
    OrderFeedPage,
    OrdersPage,
    OrderDetailsPage
} from '../../pages';

import './app.module.css';
import ProtectedRoute from "../protected-route";
import {getUserAsync} from "../../services/user/user-slice";
import {getAccessToken} from "../../services/utils";
import styles from './app.module.css';

function App() {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getIngredientsAsync());
        if (getAccessToken()) {
            dispatch(getUserAsync());
        }
    }, [dispatch]);

    const ModalSwitch = () => {
        const location = useLocation();

        const navigate = useNavigate();

        const background = location.state && location.state.background;
        const handleModalClose = () => {
            navigate(-1);
        };

        return (
            <div className={styles.App}>
                <Header/>
                <div className={styles.content}>
                    <Routes location={background || location}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/logout" element={<LogoutPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/forgot-password" element={<ProtectedRoute anonymous={true} outlet={<ForgotPasswordPage/>} />} />
                        <Route path="/reset-password" element={<ProtectedRoute anonymous={true} outlet={<ResetPasswordPage/>} />} />
                        <Route path="/profile" element={<ProtectedRoute outlet={<ProfilePage />} />} />
                        <Route path="/profile/orders/:id" element={<ProtectedRoute outlet={<OrderDetailsPage />} />} />
                        <Route path="/profile/orders" element={<ProtectedRoute outlet={<OrdersPage />} />} />
                        <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage/>}/>
                        <Route path="/feed" element={<OrderFeedPage/>}/>
                        <Route path="/feed/:id" element={<OrderDetailsPage/>}/>
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>

                    {background && (
                        <Routes>
                            <Route
                                path="/ingredients/:ingredientId"
                                element={
                                    <Modal header="Детали ингридиента" onClose={handleModalClose}>
                                        <IngredientDetailsPage />
                                    </Modal>
                                }
                            />
                            <Route
                                path="/profile/orders/:id"
                                element={
                                    <Modal header="" onClose={handleModalClose}>
                                        <OrderDetailsPage showHeader={true}/>
                                    </Modal>
                                }
                            />
                            <Route
                                path="/feed/:id"
                                element={
                                    <Modal header="" onClose={handleModalClose}>
                                        <OrderDetailsPage showHeader={true} />
                                    </Modal>
                                }
                            />
                        </Routes>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;
