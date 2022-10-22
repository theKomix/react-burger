import * as React from "react";
import {Modal} from "../../modal/modal";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectIngredientDetails, setDetails} from "../../../services/app/app-slice";
import styles from "./burger-ingredient-details.module.css";

const BurgerIngredientCharacter: React.FC<{
    caption: string;
    value: number;
}> = ({caption, value}) => {
    return (
        <div className={styles.character}>
            <div className="text text_type_main-default text_color_inactive">{caption}</div>
            <div className="text text_type_digits-default text_color_inactive">{value}</div>
        </div>
    )
}

export const BurgerIngredientDetails: React.FC = ( ) => {
    const ingredientDetails = useAppSelector(selectIngredientDetails);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(setDetails(null));
    };

    return (
        <div style={{overflow: 'hidden'}}>
            {ingredientDetails &&
                <Modal header="Детали ингридиента" onClose={onClose}>
                    <div className={styles.content}>
                        <img className={styles.image} src={ingredientDetails!.image_large} alt={ingredientDetails!.name}/>
                        <div className={styles.name}>
                            <span className="text text_type_main-medium">{ingredientDetails!.name}</span>
                        </div>
                        <div className={`${styles.characters} pt-4`}>
                            <BurgerIngredientCharacter caption="Калории, ккал" value={ingredientDetails!.calories} />
                            <BurgerIngredientCharacter caption="Белки, г" value={ingredientDetails!.proteins} />
                            <BurgerIngredientCharacter caption="Жиры, г" value={ingredientDetails!.fat} />
                            <BurgerIngredientCharacter caption="Углеводы, г" value={ingredientDetails!.carbohydrates} />
                        </div>
                    </div>
                </Modal>
            }
        </div>
    );
};