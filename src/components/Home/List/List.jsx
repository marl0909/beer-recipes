import './List.css'
import {Cards} from "./Сards/Cards";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

export const List = (props) => {

    const {ref, inView} = useInView({
        threshold: 1,
    })


    useEffect(() => {
        if (inView) {
            const element = document.getElementById('second-card');
            if (element) {
                element.scrollIntoView();
            }
            props.updatePage();
        }
    }, [inView])

    return (
        <div  className={'content'}>
            <div>
                <Cards cards={props.renderedRecipes.slice(0, 5)}/>
            </div>
            <div id={'second-card'}>
                <Cards cards={props.renderedRecipes.slice(5, 10)}/>
            </div>
            <div ref={ref}>
                <Cards cards={props.renderedRecipes.slice(10, 15)}/>
            </div>
        </div>
    )
}
