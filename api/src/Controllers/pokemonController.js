const { Pokemon } = require("../db");
// const axios = require("axios");

const cleanArray = (arr) => 
    arr.map((elem) => {
        return {
            id: elem.id,
            name: elem.name,
            type: types.map((e) => {e.types.name}),
            sprites: elem.sprites.official-artwork.front_default,
            health: elem.stats[0].base_stat,
            attack: elem.stats[1].base_stat,
            defense: elem.stats[2].base_stat,
            speed: elem.stats[5].base_stat,
            height: elem.height,
            weight: elem.weight,
            created: false
        }
    })

const crearPokemon = async (name, sprites, health, attack, defense, speed, height, weight) =>  
    await Pokemon.create({name, sprites, health, attack, defense, speed, height, weight});

const getPokemonById = async (id, source) => {
    const poke =
        source === "api"
        ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).results
        : await Pokemon.findByPk(id);
    return poke;
}

const getAllPokemons = async () => {
    const dataBasePokemon = await Pokemon.findAll();

    const apiPokemonsRaw = (
        await axios.get("https://pokeapi.co/api/v2/pokemon")
    ).results;

    const apiPokemons = cleanArray(apiPokemonsRaw)

    return [...dataBasePokemon, ...apiPokemons];
}

const searchPokemonByName = async (name) => {
    const dataBasePokemonByName = await Pokemon.findAll({where: { name: name }})

    const apiPokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`))

    return [...dataBasePokemonByName, ...apiPokemon];
}

module.exports = {crearPokemon, getPokemonById, getAllPokemons, searchPokemonByName};

