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
            const infoApi = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const infoPokemon = infoApi.data;
            console.log(infoPokemon);
            if (infoPokemon.name) {
                setPokemon(infoPokemon);
             } else {
                window.alert('No hay pokemon con ese nombre');
                history.push('/home');
             }
            } catch(error) {
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
                    {pokemon.stats && pokemon.stats[0] && (<p><b>Vida: </b>{pokemon.stats[0].base_stat}</p>)}
                    {pokemon.stats && pokemon.stats[1] && (<p><b>Ataque: </b>{pokemon.stats[1].base_stat}</p>)}
                    {pokemon.stats && pokemon.stats[2] && (<p><b>Defensa: </b>{pokemon.stats[2].base_stat}</p>)}
                    {pokemon.stats && pokemon.stats[5] && (<p><b>Velocidad: </b>{pokemon.stats[5].base_stat}</p>)}
                    {pokemon.height && (<p><b>Altura: </b>{pokemon.height}</p>)}
                    {pokemon.weight && (<p><b>Peso: </b>{pokemon.weight}</p>)}
                    {pokemon.types && (<p><b>Tipos: </b>{pokemon.types.map((types) => types.type.name.toUpperCase()).join(', ')}</p>)}
                </div>
                
                    <img className={style.image} src={pokemon.sprites?.other["official-artwork"]?.front_default} alt={pokemon.name}/>
                
            </div>
        </div>
        
    )
}