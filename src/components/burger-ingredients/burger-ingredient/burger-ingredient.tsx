import * as React from "react";
import {Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import {Ingredient} from "../../../models/ingredient";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

export const BurgerIngredient: React.FC<{
    item: Ingredient;
    count: number;}> =
    ( {item, count} ) => {
        const location = useLocation();

        const ingredientId = item['_id'];

        const [{opacity}, ref] = useDrag({
            type: item.type === 'bun' ? 'bun' : 'ingredients',
            item: {id: item._id},
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        });

        return (
            <Link
                to={`/ingredients/${ingredientId}`}
                state={{background: location}}
                className={styles.link}
            >
                <div className={styles.element} style={{opacity}}>
                    {count > 0 && <div className={styles.counter}><Counter count={count}/></div>}
                    <img ref={ref} className={styles.image} src={item.image_large} alt={item.name}/>
                    <span className={`${styles.price} text text_type_digits-default`}>
                        {item.price}
                        <CurrencyIcon type="primary"/>
                    </span>
                    <span className={styles.title}>{item.name}</span>
                </div>
            </Link>
        );
    };
