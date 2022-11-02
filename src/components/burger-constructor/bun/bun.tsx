import * as React from 'react';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { addIngredient } from '../../../services/cart/cart-slice';
import {Ingredient} from "../../../models/ingredient";
import { selectIngredients } from '../../../services/app/app-slice';
import styles from '../burger-constructor.module.css';

export const Bun: React.FC<{bun: Ingredient | undefined, isTop: boolean}> = ({bun, isTop}) => {
    const ingredients = useAppSelector(selectIngredients);
    const dispatch = useAppDispatch();

    const [{isHover}, bunTargetRef] = useDrop({
        accept: 'bun',
        drop(item: { id: string }) {
            const newIng = ingredients.find(x => x._id === item.id);
            if (newIng) {
                dispatch(addIngredient(newIng));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    return (
        bun ? <div className="pl-8" style={{opacity: isHover ? 0.5: 1}} ref={bunTargetRef} >
                <ConstructorElement
                    type={isTop ? 'top': 'bottom'}
                    isLocked={true}
                    text={bun?.name + ` (${isTop ? 'верх': 'низ'})`}
                    price={bun?.price ?? 0}
                    thumbnail={bun?.image ?? ""}
                    extraClass={`${styles.item}`}
                />
            </div>
            : isTop ? <div className={`${styles.dropContent} ${isHover && styles.hover}`} ref={bunTargetRef}>
                <span className="text text_type_main-medium">Не забудьте выбрать булку</span>
            </div>
                : <></>
    )
}