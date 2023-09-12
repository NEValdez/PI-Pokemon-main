import style from "./NavBar.module.css"
import { useHistory } from "react-router-dom"
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../Redux/actions"

const NavBar = () => {
    const history = useHistory(); 
    const dispatch = useDispatch();

    const handleSearch = (search) => {
        dispatch(getPokemonByName(search))
        .then((pokemon) => {
            console.log("getPokemonByName", search.toLowerCase());
            history.push(`/detail/${search.toLowerCase()}`);
          })
          .catch((error) => {
            console.error("Error al buscar el Pokémon:", error);
          });
      };

    return(
        <div>
            <div className={style.mainContainer}>
                <img className={style.img2} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt=""/>
                <SearchBar onSearch={handleSearch}/> 
                <button className={style.button} onClick={()=> history.push('/home')}>HOME</button>
                <button className={style.button} onClick={()=> history.push('/form')}>Crea tu pokemon!</button>            
            </div>

        </div>
    )
}

export default NavBar;