const { Router } = require('express');
const { getPokemonsHandler, getPokemonByIdHandler, getPokemonByName, postPokemon, getPokemonTypes } = require("../Handlers/pokemonHandlers")

const pokemonRouter = Router();

pokemonRouter.get("/pokemons", getPokemonsHandler)

pokemonRouter.get("/pokemons/:idPokemon", getPokemonByIdHandler)

// pokemonRouter.get("/pokemons/name", getPokemonByName)

pokemonRouter.post("/pokemons", postPokemon)

pokemonRouter.get("/types", getPokemonTypes)

module.exports = pokemonRouter;