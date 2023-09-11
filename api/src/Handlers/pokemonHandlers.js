const { crearPokemon, getPokemonById, getAllPokemons, searchPokemonByName } = require("../Controllers/pokemonController");

const getPokemonsHandler = async (req, res) => {
    const { name } = req.query;

    const results = name ? searchPokemonByName(name) : await getAllPokemons

    res.status(200).send(results);
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

// const getPokemonByName = (req, res) => {
//     const { name } = req.query;
//     res.status(200).send(`Detalle del pokemon de nombre ${name}`);
// }

const postPokemon = async (req, res) => {
    try {
    const { name, sprites, health, attack, defense, speed, height, weight } = req.body;
    const newPokemon = await crearPokemon(name, sprites, health, attack, defense, speed, height, weight);
    res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getPokemonTypes = async () => {
    try {
    const allTypes = await axios.get("https://pokeapi.co/api/v2/type").results
    res.status(200).json(allTypes);
    } catch {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    // getPokemonByName,
    postPokemon,
    getPokemonTypes
};