import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = (props) => {
    return(
        <div className={style.container}>
            <Link to={`/detail/${props.name}`}><h1 className={style.nombre}>{props.name.toUpperCase()}</h1> </Link>
            <img src={props.image} alt={props.name} />
            <p>{props.types + " "}</p>
        </div>
    );

}

export default Card;