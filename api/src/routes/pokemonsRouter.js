const { Router } = require('express');
const { getPokemonsHandler, getPokemonByIdHandler, getPokemonByNameHandler, postPokemon, getPokemonTypes } = require("../Handlers/pokemonHandlers")

const pokemonRouter = Router();

pokemonRouter.get("/", getPokemonsHandler)

pokemonRouter.get("/id/:idPokemon", getPokemonByIdHandler)

pokemonRouter.get("/name", getPokemonByNameHandler)

pokemonRouter.post("/pokemons", postPokemon)

pokemonRouter.get("/types", getPokemonTypes)

module.exports = pokemonRouter;