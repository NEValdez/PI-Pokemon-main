const { crearPokemon, getPokemonById, getAllPokemons, searchPokemonByName, getTypesFromApi } = require("../Controllers/pokemonController");

const getPokemonsHandler = async (req, res) => {
    const { name, limit, offset } = req.query;
    console.log("limit offset",limit, offset);
    const results = name ? searchPokemonByName(name) : await getAllPokemons(limit, offset)
    res.status(200).send(results);
}

const getPokemonByNameHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const results = name ? await searchPokemonByName(name) : await getAllPokemons();
        res.status(200).send(results);
    } catch {
        res.status(400).send(`No existe un pokemon con el nombre ${name}`)
    }
}

const getPokemonByIdHandler = async(req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const pokemon = await getPokemonById(id, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postPokemon = async (req, res) => {
    const { name, sprites, health, attack, defense, speed, height, weight, type } = req.body;
    try {
    const newPokemon = await crearPokemon(name, sprites, health, attack, defense, speed, height, weight, type);
    res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getPokemonTypes = async (req, res) => {
    try {
    const allTypes = await getTypesFromApi()
    res.status(200).json(allTypes);
    console.log(allTypes);
    } catch {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    getPokemonByNameHandler,
    postPokemon,
    getPokemonTypes
};