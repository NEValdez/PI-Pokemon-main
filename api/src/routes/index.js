const { Router } = require('express');
const pokemonRouter = require("./pokemonsRouter")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/pokemons", pokemonRouter)



module.exports = mainRouter;
