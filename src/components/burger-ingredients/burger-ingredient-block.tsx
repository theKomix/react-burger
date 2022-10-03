import * as React from 'react';
import {Ingredient} from "../../models/ingredient";
import {BurgerIngredient} from "./burger-ingredient";
import styles from './burger-ingredient-block.module.css';

export const BurgerIngredientBlock: React.FC<{
    list: Ingredient[];
    selected: (Ingredient|null)[];
    title: string;
    type: "bun" | "main" | "sauce"}> =
    ({ list , selected, title, type}) => {

        const getSelectedCount = (item: Ingredient) => {
            return selected.filter(ing => ing?._id === item._id).length;
        };

        return (
            <div className="mb-10">
                <p className="text text_type_main-medium mb-6" style={{textAlign: "left"}}>{title}</p>
                <div className={styles.blockContent}>
                    {list.filter((item) => (item.type === type)).map((item) => (
                        <BurgerIngredient key={item._id} item={item} count={getSelectedCount(item)}/>
                    ))}
                </div>
            </div>
        );
    };