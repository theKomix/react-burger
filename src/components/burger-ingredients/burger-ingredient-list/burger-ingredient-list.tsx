import * as React from 'react';
import {Ingredient} from "../../../models/ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredientBlock} from "../burger-ingredient-block/burger-ingredient-block";
import {BurgerIngredientDetails} from "../burger-ingredient-details/burger-ingredient-details";
import {useAppDispatch} from "../../app/hooks";
import {setDetails} from "../../../services/app/app-slice";
import styles from "./burger-ingredient-list.module.css";

export const BurgerIngredientList: React.FC = () => {
    const [current, setCurrent] = React.useState('bun');
    const bunRef = React.createRef<HTMLDivElement>();
    const sauceRef = React.createRef<HTMLDivElement>();
    const mainRef = React.createRef<HTMLDivElement>();
    const dispatch = useAppDispatch();

    const onIngredientClick = (item: Ingredient) => {
        dispatch(setDetails(item));
    };

    const tabOnClick = (value: string) => {
        setCurrent(value);
        switch (value){
            case 'bun':{
                if (bunRef.current) {
                    bunRef.current.scrollIntoView({block: "start", behavior: "smooth"});
                }
                break;
            }
            case 'sauce':
                if (sauceRef.current) {
                    sauceRef.current.scrollIntoView({block: "start", behavior: "smooth"});
                }
                break;
            case 'main':
                if (mainRef.current) {
                    mainRef.current.scrollIntoView({block: "start", behavior: "smooth"});
                }
                break;
        }
    }

    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
        const diffs = [
            Math.abs((bunRef.current?.getBoundingClientRect().top ?? 0) - (event.currentTarget.offsetTop ?? 0)),
            Math.abs((sauceRef.current?.getBoundingClientRect().top ?? 0) - (event.currentTarget.offsetTop ?? 0)),
            Math.abs((mainRef.current?.getBoundingClientRect().top ?? 0) - (event.currentTarget.offsetTop ?? 0)),
        ];
        const tabs = ['bun', 'sauce', 'main'];
        setCurrent(tabs[diffs.indexOf(Math.min(...diffs)) ?? 0]);
    };

    return (
        <div className={styles.content}>
            <p className="text text_type_main-large mt-10 mb-5" style={{textAlign: "left"}}>
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={tabOnClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={tabOnClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={tabOnClick}>
                    Начинки
                </Tab>
            </div>

            <div className={`${styles.blocks} mt-10`} onScroll={scrollHandler}>
                <BurgerIngredientBlock onIngredientClick={onIngredientClick} title="Булки" type="bun" ref={bunRef}/>
                <BurgerIngredientBlock onIngredientClick={onIngredientClick} title="Соусы" type="sauce" ref={sauceRef} />
                <BurgerIngredientBlock onIngredientClick={onIngredientClick} title="Начинки" type="main" ref={mainRef}/>
            </div>
           <BurgerIngredientDetails />
        </div>
    );
};