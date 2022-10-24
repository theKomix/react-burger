import * as React from "react";
import { useDrag } from "react-dnd";
import {Ingredient} from "../../../models/ingredient";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

export const BurgerIngredient: React.FC<{
    item: Ingredient;
    onClick: (item: Ingredient) => void;
    count: number;}> =
    ( {item, onClick, count} ) => {

    const onClickIng = () => {
        onClick(item);
    };

    const [{ opacity }, ref] = useDrag({
        type: item.type === 'bun'? 'bun' : 'ingredients',
        item: { id: item._id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div className={styles.element} onClick={onClickIng} style={{opacity}}>
            {count > 0 && <div className={styles.counter}><Counter count={count} /></div>}
            <img ref={ref} className={styles.image} src={item.image_large} alt={item.name} />
            <span className={`${styles.price} text text_type_digits-default`}>
                {item.price}
                <CurrencyIcon type="primary" />
            </span>
            <span className={styles.title}>{item.name}</span>
        </div>
    );
};