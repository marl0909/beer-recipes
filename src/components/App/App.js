import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {Home} from "../Home/Home";
import {Recipe} from "../Recipe/Recipe";

export const App = () => {
    return (
        <BrowserRouter>
            <div className={'wrapper'}>
                <Routes>
                    <Route path={`/recipe`} element={<Recipe/>}/>
                    <Route path={`/`} element={<Home/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
