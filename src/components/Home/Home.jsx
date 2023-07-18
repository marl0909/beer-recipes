import {useEffect, useState} from "react";
import {useList, useSelect} from "../../store/store";
import './Home.css'
import {List} from "./List/List";


export const Home = () => {
    const [isSelected, setIsSelected] = useState(false)
    const [renderedRecipes, setRecipes] = useState([]);
    const {selectedRecipes, clearWasteRecipes, checkSelected, unselectAllRecipes} = useSelect()
    const {list, fetchList, updateRenderedList, saveRenderedRecipes, rendered} = useList();


    useEffect(() => {
        fetchList();
        if(rendered.length) setRecipes(rendered);
    }, []);

    useEffect(() => {
        saveRenderedRecipes(renderedRecipes);
    }, [renderedRecipes])

    useEffect(() => {
        if (list.length && !rendered.length) setRecipes(list.slice(0, 15));
    }, [list]);

    useEffect(() => {
        checkSelected() ? setIsSelected(true) : setIsSelected(false);
    }, [selectedRecipes])


    const updatePage = async () => {
        const newRecipes = await updateRenderedList(renderedRecipes[renderedRecipes.length - 1].id, 5);
        clearWasteRecipes(renderedRecipes[0].id)
        setRecipes([...renderedRecipes.slice(5, 15), ...newRecipes]);
    }

    const deleteRecipes = async () => {
        const deletedRecipes = selectedRecipes;
        const remainingRecipes = renderedRecipes.filter(recipe => !deletedRecipes.includes(recipe.id));
        const newRecipes = await updateRenderedList(renderedRecipes[renderedRecipes.length - 1].id, deletedRecipes.length);
        setRecipes([...remainingRecipes, ...newRecipes]);
        unselectAllRecipes();
    }

    return (
        <div className={'home'}>
            {isSelected ? <div className={'home__btn-delete'} onClick={deleteRecipes}><h2>Delete</h2></div> : ''}
            {renderedRecipes && <List renderedRecipes={renderedRecipes} updatePage={updatePage}/>}
        </div>
    );
}