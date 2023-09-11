import { useHistory } from 'react-router-dom';
import style from './Landing.module.css'


const Landing = () => {
    const history = useHistory()
    return(
        <div className={style.container}>
            <img className={style.img1} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt=""/>
            <button className={style.pokeballButton} onClick={()=> history.push('/home')}>
                <div className={style.pokeball}>
                    <div className={style.pokeballTop}></div>
                    <div className={style.pokeballBottom}></div>
                    <div className={style.buttonCenter}></div>
                </div>
            </button>
        </div>
    )
}

export default Landing;