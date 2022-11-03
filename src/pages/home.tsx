import loading from "../images/loading.gif";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredientList} from "../components/burger-ingredients/burger-ingredient-list/burger-ingredient-list";
import {BurgerConstructor} from "../components/burger-constructor/burger-constructor";
import {Modal} from "../components/modal/modal";
import React from "react";
import {useAppSelector} from "../hooks";
import * as appService from "../services/app/app-slice";

export function HomePage() {
    const appError = useAppSelector(appService.selectError);
    const appStatus = useAppSelector(appService.selectStatus);

    const onErrorClose = () => {
    };

    return (
        <>
            {appStatus === 'loading' && <img src={loading} alt="Загрузка" className="loading"/>}
            {appStatus === 'idle' && (
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredientList/>
                    <BurgerConstructor/>
                </DndProvider>)}
            {appError && (
                <Modal onClose={onErrorClose} header={"Ошибка"}>
                    <div className="mt-5 text text_type_main-default">{appError}</div>
                </Modal>)}
        </>
    );
}
