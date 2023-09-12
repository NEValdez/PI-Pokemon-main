import { FILTER_POKEMONS_BY_TYPE, GET_POKEMONS, GET_POKEMON_BY_NAME } from "./actions";

const initialState = {
    pokemons: [],
    selectedPokemon: null,
    filteredPokemons: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return { ...state, pokemons: [...action.payload], filteredPokemons: [...action.payload] };
        case GET_POKEMON_BY_NAME:
            return { ...state, selectedPokemon: action.payload };
        case FILTER_POKEMONS_BY_TYPE:
            const type = action.payload;
            let filteredPokemons = [];
            if (type === "") {
                filteredPokemons = state.pokemons;
            } else {
                filteredPokemons = state.pokemons.filter((pokemon) => pokemon.type.includes(type));
            }
            return { ...state, filteredPokemons };
        default:
            return { ...state };
    }
};

export default rootReducer; 