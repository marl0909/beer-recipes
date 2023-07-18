import {Card} from "./Card/Card";
import './Cards.css'

export const Cards = (props) => {

    return (
        <div className={'cards'} style={{padding: 15}}>
            {props.cards.map(card => <Card card={card} key={card.id}/>)}
        </div>
    )
}