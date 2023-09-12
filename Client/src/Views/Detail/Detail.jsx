import axios from 'axios';
import style from './Detail.module.css'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import NavBar from "../../Components/NavBar/NavBar";

export default function Detail(){
    const {name} = useParams();
    const [pokemon, setPokemon] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        const buscarData = async () => {
            try {
            const infoApi = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`);
            console.log(infoApi.data);
            if (infoApi.data.name) {
                setPokemon(infoApi.data);
             } else {
                 history.push('/home');
                }
            } catch(error) {
                // window.alert('No hay pokemon con ese nombre');
                console.error("no hay pokemons con ese nombre", error);
             }
            }
        buscarData();
     }, [name, history]);

    return(
        <div className={style.container}>
            <NavBar/>
            <div className={style.pokedex}>
                <div className={style.info}>
                    {pokemon.name && (<h1>{pokemon.id}. {pokemon.name.toUpperCase()}</h1>)}
                    {pokemon.health && (<p><b>Vida: </b>{pokemon.health}</p>)}
                    {pokemon.attack && (<p><b>Ataque: </b>{pokemon.health}</p>)}
                    {pokemon.defense && (<p><b>Defensa: </b>{pokemon.health}</p>)}
                    {pokemon.speed && (<p><b>Velocidad: </b>{pokemon.speed}</p>)}
                    {pokemon.height && (<p><b>Altura: </b>{pokemon.height}</p>)}
                    {pokemon.weight && (<p><b>Peso: </b>{pokemon.weight}</p>)}
                    {pokemon.types && (<p><b>Tipos: </b>{pokemon.types.map((types) => types.type.name.toUpperCase()).join(', ')}</p>)}
                </div>
                
                    <img className={style.image} src={pokemon.sprites} alt={pokemon.name}/>
                
            </div>
        </div>
        
    )
}