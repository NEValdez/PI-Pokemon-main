import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID"
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE"


export const getPokemons = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`);
        const pokemonList = response.data.results;
  
        const pokemonDataPromises = pokemonList.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const pokemonData = pokemonResponse.data;
          const imageUrl = pokemonData.sprites.other["official-artwork"].front_default;
          const types = pokemonData.types.map(typeData => typeData.type.name + " ");
  
          return {
            name: pokemonData.name,
            types: types,
            imageUrl: imageUrl,
          };
        });
  
        const pokemonDataResolve = await Promise.all(pokemonDataPromises);
  
        dispatch({
          type: GET_POKEMONS,
          payload: pokemonDataResolve,
        });
      } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
      }
    };
  };

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            const pokemonData = response.data;
            const imageUrl = pokemonData.sprites.other["official-artwork"].front_default;
            const types = pokemonData.types.map(typeData => typeData.type.name + "");

            const pokemon = {
              name: pokemonData.name,
              types: types,
              imageUrl: imageUrl, 
            }

            dispatch({
              type: GET_POKEMON_BY_NAME,
              payload: pokemon,
            });
            return pokemon;
          } catch (error) {
            console.error("Error al obtener el Pokémon:", error);
          }
        };
      };

export const filterPokemonsByType = (type) => {
    return {
        type: FILTER_POKEMONS_BY_TYPE,
          payload: type,
    };
  };