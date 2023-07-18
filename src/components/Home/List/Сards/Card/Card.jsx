import {useRecipe, useSelect} from "../../../../../store/store";
import "./Card.css"
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import beerDefoult from '../../../../../store/media/beer.png'

export const Card = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const {selectedRecipes, selectRecipe, unselectRecipe} = useSelect();
    const setRecipe = useRecipe(state => state.setRecipe)


    useEffect(() => {
        if (selectedRecipes.includes(Number(props.card.id))) setIsSelected(true)
    }, [selectedRecipes])

    const HandleClick = (e) => {
        e.preventDefault();
        isSelected ? unselectRecipe(props.card.id) : selectRecipe(props.card.id);
        setIsSelected(!isSelected);
    }

    const click = () => {
        setRecipe(props.card)
    }

    return (
        <NavLink onClick={click} to={"/recipe"} className={'recipe' + (isSelected ? ' selected' : '')}
                 style={{marginBottom: 25}} onContextMenu={HandleClick} id={props.card.id}>
            <div className={'recipe__image'}>
                <img src={props.card.image_url ? props.card.image_url : beerDefoult} alt="beer_img"/>
            </div>
            <div className={'recipe__description'}>
                <h2 className={'recipe__name'}>{props.card.name}</h2>
                <div className={'recipe__beer-characteristic'}>
                    <h3 className={'recipe__beer-characteristic__abv'}>abv: {props.card.abv}</h3>
                    <h3 className={'recipe__beer-characteristic__ibu'}>ibu: {props.card.ibu}</h3>
                </div>
                <div className={'recipe__description_text'}>
                    <p>{props.card.description}</p>
                </div>
            </div>
        </NavLink>
    )
}