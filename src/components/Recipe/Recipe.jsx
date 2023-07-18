import {useRecipe} from "../../store/store";
import {NavLink} from "react-router-dom";
import './Recipe.css'

export const Recipe = () => {

    const recipe = useRecipe(state => state.recipe);


    return (
        <div className={'recipe-page'}>
            <NavLink to={'/'}>
                <div className={'recipe-page__btn-back'}><h2>Back</h2></div>
            </NavLink>
            <div className={'recipe-page__content'}>
                <section className={'recipe-page__description'}>
                    <div className={'recipe-page__image'}>
                        <img src={recipe.image_url} alt="beer_img"/>
                    </div>
                    <div className={'recipe-page__description__text'}>
                        <div>
                            <h2 className={'recipe__name'}>{recipe.name}</h2>
                            <h3 className={'recipe__name'}>{recipe.tagline}</h3>
                        </div>
                        <div className={'recipe-page__beer-characteristic'}>
                            <h3>abv: {recipe.abv}</h3>
                            <h3>ibu: {recipe.ibu}</h3>
                            <h3>ebc: {recipe.ebc}</h3>
                            <h3>srm: {recipe.srm}</h3>
                            <h3>ph: {recipe.ph}</h3>
                        </div>
                    </div>
                </section>
                <section className={'recipe-page__process'}>
                    <h3>volume: {recipe.volume.value} {recipe.volume.unit}</h3>
                    <div className={'recipe-page__process__ingredients'}>
                        <h2>Ingredients</h2>
                            {recipe.ingredients.malt.map(malt =>
                                <p>{malt.name}: {malt.amount.value} {malt.amount.unit}</p>)}
                            {recipe.ingredients.hops.map(hops =>
                                <p>{hops.name}: {hops.amount.value} {hops.amount.unit} + {hops.add} {hops.attribute}</p>)}
                            <p>{recipe.ingredients.yeast}</p>
                    </div>
                    <div>
                        <h2>Process</h2>
                        <p>
                            Boil {recipe.boil_volume.value} {recipe.boil_volume.unit} at a temperature
                            of {recipe.method.mash_temp[0].temp.value} degrees {recipe.method.mash_temp[0].temp.unit} for {recipe.method.mash_temp[0].duration} minutes.
                        </p>
                        <p>fermentation temperature is {recipe.method.fermentation.temp.value} degrees {recipe.method.fermentation.temp.unit}.</p>
                        <p>{recipe.method?.twist}</p>
                    </div>
                    <div>
                        <h2>Food pairing</h2>
                        {recipe.food_pairing.map(pair => <p>{pair}</p>)}
                    </div>
                    <div>
                        <h2>Tips</h2>
                        <p>{recipe.brewers_tips}</p>
                    </div>
                </section>
                <h3 className={'recipe-page__content__contributed'}>contributed by: {recipe.contributed_by}</h3>
            </div>
        </div>
    )
}