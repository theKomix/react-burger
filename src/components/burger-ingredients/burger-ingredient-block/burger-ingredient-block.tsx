import * as React from 'react';
import {Ingredient} from "../../../models/ingredient";
import {BurgerIngredient} from "../burger-ingredient/burger-ingredient";
import styles from './burger-ingredient-block.module.css';

export const BurgerIngredientBlock: React.FC<{
    list: Ingredient[];
    getCount: (item: Ingredient) => number;
    onIngredientClick: (item: Ingredient) => void;
    title: string;
    type: "bun" | "main" | "sauce"}> =
    ({ list , getCount, onIngredientClick, title, type}) => {

        return (
            <div className="mb-10">
                <p className="text text_type_main-medium mb-6" style={{textAlign: "left"}}>{title}</p>
                <div className={styles.blockContent}>
                    {list.filter((item) => (item.type === type)).map((item) => (
                        <BurgerIngredient key={item._id} item={item} count={getCount(item)} onClick={onIngredientClick}/>
                    ))}
                </div>
            </div>
        );
    };