import React, { useEffect, useContext, useState } from 'react'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import PokemonCard from '../components/PokemonCard'
import UserContext from '../store/user-context'
import { fetchMyFavoritePokemons, removeFavoritePokemon } from '../services/user';
import { fetchPokemonsById } from '../services/pokemon'

const MyFavorites = () => {
    const [favoritePokemons, setFavoritePokemons] = useState([])
    const userCtx = useContext(UserContext)

    useEffect(() => {
        (async () => {
            const access_token = localStorage.getItem("token")
            if (access_token) {
                const { favorites } = await fetchMyFavoritePokemons(access_token)
                const pokemonIdList = favorites.map(fav => fav.pokemon_id)
                const favoritePokemons = await fetchPokemonsById(pokemonIdList)
                setFavoritePokemons(favoritePokemons)
                userCtx.upsertFavoritePokemons(favorites)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const access_token = localStorage.getItem("token")
            if (access_token) {
                const pokemonIdList = userCtx.favorites.map(fav => fav.pokemon_id)
                const favoritePokemons = await fetchPokemonsById(pokemonIdList)
                setFavoritePokemons(favoritePokemons)
            }
        })()
    }, [userCtx.favorites])

    const removeFromFavoriteHandler = async (pokemon_id) => {
        const favoritePokemons = await removeFavoritePokemon({ pokemon_id })
        userCtx.upsertFavoritePokemons(favoritePokemons)
    }

    if (favoritePokemons.length === 0) {
        return <Container className="mt-5">
            <Alert variant="warning">You have not added any favorite pokemons</Alert>
        </Container>
    }

    return (
        <div>
            <Row xs={1} md={5} className="g-4 m-2">
                {
                    favoritePokemons.map(pokemon => (
                        <Col key={pokemon.id}>
                            <PokemonCard pokemon={pokemon}
                                addToFavorite={() => { }}
                                removeFromFavorite={removeFromFavoriteHandler}
                                disableButton={!userCtx.user}
                                isFavoritePokemon={userCtx.isFavoritePokemon(pokemon.id)}
                            />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default MyFavorites
