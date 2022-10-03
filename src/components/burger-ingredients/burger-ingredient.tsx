import * as React from "react";
import {Ingredient} from "../../models/ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

export const BurgerIngredient: React.FC<{item: Ingredient}> = ( {item} ) => {
    return (
        <div className={styles.element}>
            <img className={styles.image} src={item.image_large} alt={item.name} />
            <span className={`${styles.price} text text_type_digits-default`}>
                {item.price}
                <CurrencyIcon type="primary" />
            </span>
            <span className={styles.title}>{item.name}</span>
        </div>
    );
};