import style from "./CardContainer.module.css"
import Card from "../Card/Card"
import React from "react";

const CardContainer = ( {pokemons} ) => {
    return (
        <div className={style.container}>
            {pokemons?.map((pokemon, i) => {
                return (
                    <Card 
                        key={i}
                        image={pokemon.sprites}
                        type={pokemon.type}
                        name={pokemon.name}
                    />
                );
            })}
        </div>
        );
};

export default CardContainer;