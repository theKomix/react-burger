import React from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {Header} from "./components/header/header";
import { getIngredientsAsync } from "./services/app/app-slice";
import { useAppDispatch } from './hooks';
import { Modal } from './components/modal/modal';
import {
    ForgotPasswordPage,
    HomePage, IngredientDetailsPage,
    LoginPage, LogoutPage,
    NotFound404,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage
} from './pages';

import './App.css';
import ProtectedRoute from "./components/protected-route";
import {getUserAsync} from "./services/user/user-slice";
import AnonymousRoute from "./components/anonymous-route";
import {getAccessToken} from "./services/utils";

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

        let background = location.state && location.state.background;
        const handleModalClose = () => {
            navigate(-1);
        };

        return (
            <div className="App">
                <Header/>
                <div className="content">
                    <Routes location={background || location}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/logout" element={<LogoutPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/forgot-password" element={<AnonymousRoute outlet={<ForgotPasswordPage/>} />} />
                        <Route path="/reset-password" element={<AnonymousRoute outlet={<ResetPasswordPage/>} />} />
                        <Route path="/profile" element={<ProtectedRoute outlet={<ProfilePage />} />} />
                        <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage/>}/>
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>

                    {background && (
                        <Routes>
                            <Route
                                path='/ingredients/:ingredientId'
                                element={
                                    <Modal header="Детали ингридиента" onClose={handleModalClose}>
                                        <IngredientDetailsPage />
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
