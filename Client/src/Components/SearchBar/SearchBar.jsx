import style from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar(props) {
   const [name, setName] = useState('');

   const handleChange = (event) => {
    let {value} = event.target;
    setName(value);
    }

    const handleSearch = () => {
        props.onSearch(name)
    }
 return (
    <div className={style.container}>
       <input className={style.search}  type='search' onChange={handleChange} value={name}/>
       <button className={style.pokeballButton} onClick={handleSearch}>
         <div className={style.pokeball}>
                    <div className={style.pokeballTop}></div>
                    <div className={style.pokeballBottom}></div>
                    <div className={style.buttonCenter}></div>
         </div>
       </button>
       
    </div>
 );
}
