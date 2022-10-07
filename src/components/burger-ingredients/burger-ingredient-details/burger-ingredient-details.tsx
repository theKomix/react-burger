import * as React from "react";
import {Ingredient} from "../../../models/ingredient";
import {Modal} from "../../modal/modal";
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

export const BurgerIngredientDetails: React.FC<{
    item: Ingredient | null,
    onClose: () => void
}> = ( {item, onClose} ) => {

    return (
        <div style={{overflow: 'hidden'}}>
            {item &&
                <Modal header="Детали ингридиента" onClose={onClose}>
                    <div className={styles.content}>
                        <img className={styles.image} src={item!.image_large} alt={item!.name}/>
                        <div className={styles.name}>
                            <span className="text text_type_main-medium">{item!.name}</span>
                        </div>
                        <div className={`${styles.characters} pt-4`}>
                            <BurgerIngredientCharacter caption="Калории, ккал" value={item.calories} />
                            <BurgerIngredientCharacter caption="Белки, г" value={item.proteins} />
                            <BurgerIngredientCharacter caption="Жиры, г" value={item.fat} />
                            <BurgerIngredientCharacter caption="Углеводы, г" value={item.carbohydrates} />
                        </div>
                    </div>
                </Modal>
            }
        </div>
    );
};