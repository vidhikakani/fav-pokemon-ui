import React, { useEffect, useContext, useState } from 'react'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/Container"
import PokemonCard from '../components/PokemonCard'
import UserContext from '../store/user-context'
import { fetchMyFavoritePokemons, removeFavoritePokemon } from '../services/user';
import { fetchPokemonsById } from '../services/pokemon'

const MyFavorites = () => {
    const [favoritePokemons, setFavoritePokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const userCtx = useContext(UserContext)

    useEffect(() => {
        (async () => {
            const access_token = localStorage.getItem("token")
            if (access_token) {
                setIsLoading(true)
                const { favorites } = await fetchMyFavoritePokemons(access_token)
                const pokemonIdList = favorites.map(fav => fav.pokemon_id)
                const favoritePokemons = await fetchPokemonsById(pokemonIdList)
                setFavoritePokemons(favoritePokemons)
                userCtx.upsertFavoritePokemons(favorites)
                setIsLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const access_token = localStorage.getItem("token")
            if (access_token) {
                setIsLoading(true)
                const pokemonIdList = userCtx.favorites.map(fav => fav.pokemon_id)
                const favoritePokemons = await fetchPokemonsById(pokemonIdList)
                setFavoritePokemons(favoritePokemons)
                setIsLoading(false)
            }
        })()
    }, [userCtx.favorites])

    const removeFromFavoriteHandler = async (pokemon_id) => {
        const favoritePokemons = await removeFavoritePokemon({ pokemon_id })
        userCtx.upsertFavoritePokemons(favoritePokemons)
    }

    if (isLoading) {
        return (
            <Container className="mt-5">
                <Spinner
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                />
            </Container>
        )
    } else if (!isLoading && favoritePokemons.length === 0) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">You have not added any favorite pokemons</Alert>
            </Container>
        )
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
