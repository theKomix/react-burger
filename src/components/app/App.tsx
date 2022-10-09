import React from 'react';
import './App.css';
import {Ingredient} from "../../models/ingredient";
import {Header} from "../header/header";
import {BurgerIngredientList} from "../burger-ingredients/burger-ingredient-list/burger-ingredient-list";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {GetIngredients} from "../../services/get-ingredients";
import {Modal} from "../modal/modal";

function App() {
    const [listIngredients, setListIngredients] = React.useState<Ingredient[]>([]);
    const [topBun, setTopBun] = React.useState<Ingredient | null>(null);
    const [bottomBun, setBottomBun] = React.useState<Ingredient | null>(null);
    const [selectedIngredients, setSelectedIngredients] = React.useState<Ingredient[]>([]);
    const [error, setError] = React.useState<string>("");

    React.useEffect(() => {
        GetIngredients()
            .then(items => {
                setListIngredients(items);
                setTopBun(items.find(i => i.type === "bun") ?? null);
                setBottomBun(items.find(i => i.type === "bun") ?? null);

                //заполнение для теста
                const notBunIngs = items.filter(i => (i.type !== "bun"));
                const selected = [] as Ingredient[];
                for (let i = 0; i < 7; i++) {
                    selected.push(notBunIngs[Math.floor(Math.random() * notBunIngs.length)]);
                }
                setSelectedIngredients(selected);
            })
            .catch(() => {
                setError("Произошла ошибка, перезагрузите страницу...")
            });
    }, []);

    const onErrorClose = () => {};

    return (
        <div className="App">
            <Header/>
            <BurgerIngredientList list={listIngredients} selected={[topBun, bottomBun, ...selectedIngredients]}/>
            <BurgerConstructor topBun={topBun} bottomBun={bottomBun} list={selectedIngredients}/>
            {error && <Modal onClose={onErrorClose} header={"Ошибка"}><div className="mt-5 text text_type_main-default">{error}</div></Modal>}
        </div>
    );
}

export default App;
