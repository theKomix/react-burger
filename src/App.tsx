import React from 'react';
import './App.css';
import {Header} from "./components/header/header";
import {BurgerIngredientList} from "./components/burger-ingredients/burger-ingredient-list";
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";
import {Ingredient} from "./models/ingredient";
import {GetIngredients} from "./services/get-ingredients";

function App() {
    const [listIngredients, setListIngredients] = React.useState<Ingredient[]>([]);
    const [topBun, setTopBun] = React.useState<Ingredient | null>(null);
    const [bottomBun, setBottomBun] = React.useState<Ingredient | null>(null);
    const [selectedIngredients, setSelectedIngredients] = React.useState<Ingredient[]>([]);

    React.useEffect(() => {
        let mounted = true;
        GetIngredients()
            .then(items => {
                if (mounted) {
                    setListIngredients(items);
                    setTopBun(items.find(i => i._id === "60666c42cc7b410027a1a9b1") ?? null);
                    setBottomBun(items.find(i => i._id === "60666c42cc7b410027a1a9b1") ?? null);

                    setSelectedIngredients(
                        items.filter(i => (
                            i._id === "60666c42cc7b410027a1a9b9"
                            || i._id === "60666c42cc7b410027a1a9b4"
                            || i._id === "60666c42cc7b410027a1a9bc"
                            || i._id === "60666c42cc7b410027a1a9bb"
                            || i._id === "60666c42cc7b410027a1a9ba"
                            || i._id === "60666c42cc7b410027a1a9bd"
                            || i._id === "60666c42cc7b410027a1a9be"
                        )),
                    );
                }
            })
        return () => {
            mounted = false
        };
    }, [])
    return (
        <div className="App">
            <Header/>
            <BurgerIngredientList list={listIngredients}/>
            <BurgerConstructor topBun={topBun} bottomBun={bottomBun} list={selectedIngredients}/>
        </div>
    );
}

export default App;
