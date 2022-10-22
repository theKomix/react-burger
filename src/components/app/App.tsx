import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Header} from "../header/header";
import {BurgerIngredientList} from "../burger-ingredients/burger-ingredient-list/burger-ingredient-list";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {getIngredientsAsync} from "../../services/app/app-slice";
import {Modal} from "../modal/modal";
import { useAppSelector, useAppDispatch } from './hooks';
import * as appService from '../../services/app/app-slice';
import loading from '../../images/loading.gif';

import './App.css';

function App() {
    const appError = useAppSelector(appService.selectError);
    const appStatus = useAppSelector(appService.selectStatus);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getIngredientsAsync());
    }, [dispatch]);

    const onErrorClose = () => {};

    return (
        <div className="App">
            <Header/>
            {appStatus === 'loading' && <img src={loading} alt="Загрузка" className="loading"/>}
            {appStatus === 'idle' && <DndProvider backend={HTML5Backend}>
                <BurgerIngredientList />
                <BurgerConstructor />
            </DndProvider>}
            {appError && <Modal onClose={onErrorClose} header={"Ошибка"}><div className="mt-5 text text_type_main-default">{appError}</div></Modal>}
        </div>
    );
}

export default App;
