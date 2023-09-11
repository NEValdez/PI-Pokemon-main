import axios from "axios";

export const getPokemonDetailsByName = async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = response.data;
    return pokemonData;
  } catch (error) {
    console.error("Error al obtener detalles del Pokémon:", error);
    throw error;
  }
};