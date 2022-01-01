import { createContext, useState } from 'react';

const UserContext = createContext({
    user: {},
    favorites: [],
    addUser: (user) => { },
    removeUser: () => { },
    upsertFavoritePokemons: (updatedFavoritesList) => { },
    isFavoritePokemon: (pokemonId) => { },
});

export function UserContextProvider(props) {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    function addUserHandler(user) {
        setUser(user)
    }

    function removeUserHandler() {
        setUser(null);
    }

    function upsertFavoritePokemonsHandler(updatedFavoritesList) {
        setFavorites(updatedFavoritesList)
    }

    function isFavoritePokemonHandler(pokemonId) {
        return favorites.filter(pokemon => pokemon.pokemon_id === pokemonId).length === 1
    }

    const context = {
        user,
        favorites,
        addUser: addUserHandler,
        removeUser: removeUserHandler,
        upsertFavoritePokemons: upsertFavoritePokemonsHandler,
        isFavoritePokemon: isFavoritePokemonHandler
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;
