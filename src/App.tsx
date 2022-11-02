import React from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {Header} from "./components/header/header";
import { getIngredientsAsync } from "./services/app/app-slice";
import { useAppDispatch } from './hooks';
import { Modal } from './components/modal/modal';
import {
    ForgotPasswordPage,
    HomePage, IngredientDetailsPage,
    LoginPage,
    NotFound404,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage
} from './pages';

import './App.css';

function App() {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getIngredientsAsync());
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
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
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
