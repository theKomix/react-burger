import * as React from 'react';
import {Ingredient} from "../../models/ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredientBlock} from "./burger-ingredient-block";
import styles from "./burger-ingredient-list.module.css";

export const BurgerIngredientList: React.FC<{list: Ingredient[];}> = ({ list }) => {
    const [current, setCurrent] = React.useState('ban')
    return (
        <div className={styles.content}>
            <p className="text text_type_main-large mt-10 mb-5" style={{textAlign: "left"}}>
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                <Tab value="ban" active={current === 'ban'} onClick={setCurrent}>
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
                <BurgerIngredientBlock list={list} title="Булки" type="bun"/>
                <BurgerIngredientBlock list={list} title="Соусы" type="sauce"/>
                <BurgerIngredientBlock list={list} title="Начинки" type="main"/>
            </div>
        </div>
    );
};