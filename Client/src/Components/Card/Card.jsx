import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = (props) => {

    const getBackgroundByType = (type) => {
        switch (type.toLowerCase()){
            case "fire":
                return <p className={style.fire}>{type}</p>
            case "water":
                return <p className={style.water}>{type}</p>
            case "grass":
                return <p className={style.grass}>{type}</p>
            case "normal":
                return <p className={style.normal}>{type}</p>
            case "fighting":
                return <p className={style.fighting}>{type}</p>
            case "flying":
                return <p className={style.flying}>{type}</p>
            case "poison":
                return <p className={style.poison}>{type}</p>
            case "ground":
                return <p className={style.ground}>{type}</p>
            case "rock":
                return <p className={style.rock}>{type}</p>
            case "bug":
                return <p className={style.bug}>{type}</p>
            case "ghost":
                return <p className={style.ghost}>{type}</p>
            case "steel":
                return <p className={style.steel}>{type}</p>
            case "electric":
                return <p className={style.electric}>{type}</p>
            case "psychic":
                return <p className={style.psychic}>{type}</p>
            case "ice":
                return <p className={style.ice}>{type}</p>
            case "dragon":
                return <p className={style.dragon}>{type}</p>
            case "dark":
                return <p className={style.dark}>{type}</p>
            case "fairy":
                return <p className={style.fairy}>{type}</p>
            default:
                return <p className={style.shadow}>{type}</p>;
        }
    }

    return(
        <div className={style.container}>
            <Link to={`/detail/${props.name}`}><h1 className={style.nombre}>{props.name.toUpperCase()}</h1> </Link>
            <img src={props.image} alt={props.name} />
            <div className={style.allTypes}>
            {props.type.map((t)=>getBackgroundByType(t.toUpperCase()))}
            </div>
        </div>
    );

}

export default Card;