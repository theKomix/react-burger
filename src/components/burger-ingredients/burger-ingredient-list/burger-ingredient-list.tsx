import * as React from 'react';
import {Ingredient} from "../../../models/ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredientBlock} from "../burger-ingredient-block/burger-ingredient-block";
import {BurgerIngredientDetails} from "../burger-ingredient-details/burger-ingredient-details";

import styles from "./burger-ingredient-list.module.css";
import {OrderContext} from "../../../context/order-context";

export const BurgerIngredientList: React.FC<{list: Ingredient[]}> = ({ list }) => {
    const [current, setCurrent] = React.useState('bun');
    const [detailsIngredient, setDetailsIngredient] = React.useState<Ingredient | null>(null);
    const {state} = React.useContext(OrderContext);

    const getSelectedCount = (item: Ingredient) => {
        return state?.ingredients.filter(ing => ing?._id === item._id).length ?? 0;
    };

    const onIngredientClick = (item: Ingredient) => {
        setDetailsIngredient(item);
    };

    const onDetailsClose = () => {
        setDetailsIngredient(null);
    };

    return (
        <div className={styles.content}>
            <p className="text text_type_main-large mt-10 mb-5" style={{textAlign: "left"}}>
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={`${styles.blocks} mt-10`}>
                <BurgerIngredientBlock list={list} getCount={getSelectedCount} onIngredientClick={onIngredientClick} title="Булки" type="bun"/>
                <BurgerIngredientBlock list={list} getCount={getSelectedCount} onIngredientClick={onIngredientClick} title="Соусы" type="sauce"/>
                <BurgerIngredientBlock list={list} getCount={getSelectedCount} onIngredientClick={onIngredientClick} title="Начинки" type="main"/>
            </div>
           <BurgerIngredientDetails onClose={onDetailsClose} item={detailsIngredient!} />
        </div>
    );
};