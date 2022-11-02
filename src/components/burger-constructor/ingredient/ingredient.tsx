import * as React from 'react';
import { useDrop, useDrag} from 'react-dnd';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {addIngredient, CartItem, moveIngredient, removeIngredient, selectCart} from '../../../services/cart/cart-slice';
import { selectIngredients } from '../../../services/app/app-slice';
import styles from '../burger-constructor.module.css';

interface Item {
    id: string
    originalIndex: number
}

export const Ingredient: React.FC<{
    item: CartItem
    }> = ({item}) => {

    const ingredients = useAppSelector(selectIngredients);
    const cartState = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    const removeItem = (item: CartItem) => {
        dispatch(removeIngredient(item.id));
    };

    const findItem = React.useCallback(
        (id: string) => {
            const card = cartState.items.filter((c) => c.id === id)[0]
            return {
                item: card,
                index: cartState.items.indexOf(card),
            }
        },
        [cartState.items],
    )

    const moveItem = React.useCallback(
        (id: string, atIndex: number) => {
            dispatch(moveIngredient({id, newIndex: atIndex}));
        },
        [dispatch],
    )

    const originalIndex = findItem(item.id).index;
    const [{ opacity }, drag] = useDrag(
        () => ({
            type:'cartItems',
            item: { id: item.id, originalIndex },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0 : 1,
            }),
            end: (item, monitor) => {
                const { id: droppedId, originalIndex } = item
                const didDrop = monitor.didDrop()
                if (!didDrop) {
                    moveItem(droppedId, originalIndex)
                }
            },
        }),
        [item.id, originalIndex, moveItem],
    )

    const [, drop] = useDrop(
        () => ({
            accept: 'cartItems',
            hover({ id: draggedId }: Item) {
                if (draggedId !== item.id) {
                    const { index: overIndex } = findItem(item.id)
                    moveItem(draggedId, overIndex)
                }
            },
        }),
        [findItem, moveItem],
    )

    const [{isHover}, fromItemsTargetRef] = useDrop({
        accept: 'ingredients',
        drop(item: { id: string }) {
            const newIng = ingredients.find(x => x._id === item.id);
            if (newIng) {
                dispatch(addIngredient(newIng));
                moveItem("", originalIndex + 1);
            }
        },
        collect: monitor => (
            {
                isHover: monitor.isOver()
            })
    });

    return (
        <div className={styles.element} style={{opacity: isHover ? 0.5 : opacity}} ref={(node) => fromItemsTargetRef(drag(drop(node)))}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.ingredient.name}
                price={item.ingredient.price}
                thumbnail={item.ingredient.image}
                extraClass={styles.item}
                handleClose={() => removeItem(item)}
            />
        </div>
    )
}