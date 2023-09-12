import axios from "axios";

export const getPokemonDetailsByName = async (name) => {
  try {
    const response = await axios.get(`https://localhost:3001/pokemon/${name}`);
    const pokemonData = response.data;
    return pokemonData;
  } catch (error) {
    console.error(`Error al obtener detalles del Pokémon: ${name}`, error);
    throw error;
  }
};

export const getAllTypes = async () => {
  try{
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    return response.data.results.map((type) => type.name);
  } catch (error) {
    console.error("Error al obtener los tipos", error);
    throw error;
  }
}