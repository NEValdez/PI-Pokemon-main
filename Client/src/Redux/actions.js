import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID"
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE"


export const getPokemons = (limit, offset) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/pokemons/?limit=${limit}&offset=${offset}}`);
        const infoPokemon = response.data
        dispatch({
          type: GET_POKEMONS,
          payload: infoPokemon,
        });
      } catch (error) {
        window.alert("Error al obtener los Pokémon:", error);
      }
    };
  };

export const getPokemonByName = (name) => {
  console.log(name);
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/pokemons/name?name=${name.toLowerCase()}`);
            const pokemonData = response.results;
            dispatch({
              type: GET_POKEMON_BY_NAME,
              payload: pokemonData,
            });
            return pokemonData;
          } catch (error) {
            window.alert("No hay pokemon con ese nombre")
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