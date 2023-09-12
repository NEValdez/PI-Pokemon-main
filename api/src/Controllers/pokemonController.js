const { Pokemon } = require("../db");
const axios = require("axios");

const cleanArray = (arr) => {
    return arr.map(async (elem) => { 
        const pokemonResponse = await axios.get(elem.url);
        const pokemonData = pokemonResponse.data;
        return {
            id: pokemonData.id,
            name: pokemonData.name,
            type: pokemonData.types.map((e) => e.type.name),
            sprites: pokemonData.sprites.other["official-artwork"].front_default,
            health: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            defense: pokemonData.stats[2].base_stat,
            speed: pokemonData.stats[5].base_stat,
            height: pokemonData.height,
            weight: pokemonData.weight,
            created: false
        }

    })
}

const parser = (pokemonData) => {
    console.log(pokemonData.data);
    return {
        id: pokemonData.id,
        name: pokemonData.name,
        type: pokemonData.types.map((e) => e.type.name),
        sprites: pokemonData.sprites.other["official-artwork"].front_default,
        health: pokemonData.stats[0].base_stat,
        attack: pokemonData.stats[1].base_stat,
        defense: pokemonData.stats[2].base_stat,
        speed: pokemonData.stats[5].base_stat,
        height: pokemonData.height,
        weight: pokemonData.weight,
        created: false
    }
}

const crearPokemon = async (name, sprites, health, attack, defense, speed, height, weight, type) => {
    return await Pokemon.create({name, sprites, health, attack, defense, speed, height, weight, type});}

const getPokemonById = async (id, source) => {
    const poke =
        source === "api"
        ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).results
        : await Pokemon.findByPk(id);
    return poke;
}

const getAllPokemons = async (limit, offset) => {
    const dataBasePokemon = await Pokemon.findAll();

    const apiPokemonsRaw = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const response = apiPokemonsRaw.data
    const apiPokemons = cleanArray(response.results)
    const pokemonDataResolve = await Promise.all(apiPokemons);
    return [...dataBasePokemon, ...pokemonDataResolve];
}

const searchPokemonByName = async (name) => {
    const dataBasePokemonByName = await Pokemon.findAll({where: { name: name }})
    const apiPokemonRaw = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) 
    const apiPokemons = parser(apiPokemonRaw.data)
    console.log(apiPokemons);
    return {...dataBasePokemonByName, ...apiPokemons};
}

const getTypesFromApi = async () => {
    const allTypes = await axios.get("https://pokeapi.co/api/v2/type")
    const response = allTypes.data.results.map((type) => type.name)
    return response;
}

module.exports = {crearPokemon, getPokemonById, getAllPokemons, searchPokemonByName, getTypesFromApi};

