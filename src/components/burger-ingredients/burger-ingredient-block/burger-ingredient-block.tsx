import React, {forwardRef} from 'react';
import {Ingredient} from "../../../models/ingredient";
import {BurgerIngredient} from "../burger-ingredient/burger-ingredient";
import styles from './burger-ingredient-block.module.css';
import {useAppSelector} from "../../../hooks";
import {selectIngredients} from "../../../services/app/app-slice";
import {selectCart} from "../../../services/cart/cart-slice";

export const BurgerIngredientBlock = forwardRef<HTMLDivElement, {
    title: string;
    type: "bun" | "main" | "sauce"}>( ({ title, type}, ref) => {
        const ingredients = useAppSelector(selectIngredients);
        const orderState = useAppSelector(selectCart);

        const getSelectedCount = (item: Ingredient) => {
            return orderState.items.filter(ing => ing?.ingredient._id === item._id).length ?? 0;
        };

        return (
            <div className="mb-10" ref={ref}>
                <p className="text text_type_main-medium mb-6" style={{textAlign: "left"}}>{title}</p>
                <div className={styles.blockContent}>
                    {ingredients.filter((item) => (item.type === type)).map((item) => (
                        <BurgerIngredient key={item._id} item={item} count={getSelectedCount(item)} />
                    ))}
                </div>
            </div>
        );
    });