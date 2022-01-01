import React, { useEffect, useState, useContext } from 'react'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import PokemonCard from '../components/PokemonCard'
import { fetchAllPokemons } from '../services/pokemon'
import { fetchMyFavoritePokemons, removeFavoritePokemon } from "../services/user"
import { addFavoritePokemon } from '../services/user'
import UserContext from '../store/user-context';

const Home = () => {
    const [pokemonData, setPokemonData] = useState([])
    const [next, setNext] = useState(null)
    const userCtx = useContext(UserContext)

    useEffect(() => {
        async function fetchAll() {
            const { nextUrl, pokemon_data } = await fetchAllPokemons(next)
            const pokemons = pokemonData.concat(pokemon_data)
            setPokemonData(pokemons)
            setNext(nextUrl)
        }
        fetchAll()

        return () => setPokemonData([])
    }, [])

    useEffect(() => {
        (async () => {
            const access_token = localStorage.getItem("token")
            if (access_token) {
                const { favorites } = await fetchMyFavoritePokemons(access_token)
                userCtx.upsertFavoritePokemons(favorites)
            }
        })()

        return () => { }
    }, [pokemonData])

    const loadMoreHandler = async () => {
        const { nextUrl, pokemon_data } = await fetchAllPokemons(next)
        const pokemons = pokemonData.concat(pokemon_data)
        setPokemonData(pokemons)
        setNext(nextUrl)
    }

    const addToFavoriteHandler = async (pokemon_id) => {
        const favoritePokemons = await addFavoritePokemon({ pokemon_id })
        userCtx.upsertFavoritePokemons(favoritePokemons)
    }

    const removeFromFavoriteHandler = async (pokemon_id) => {
        const favoritePokemons = await removeFavoritePokemon({ pokemon_id })
        userCtx.upsertFavoritePokemons(favoritePokemons)
    }

    return (
        <div>
            <Row xs={1} md={5} className="g-4 m-2">
                {
                    pokemonData.map(pokemon => (
                        <Col key={pokemon.id}>
                            <PokemonCard pokemon={pokemon}
                                addToFavorite={addToFavoriteHandler}
                                disableButton={!userCtx.user}
                                isFavoritePokemon={userCtx.isFavoritePokemon(pokemon.id)}
                                removeFromFavorite={removeFromFavoriteHandler}
                            />
                        </Col>
                    ))
                }
            </Row>
            <Row xs={1} className="g-4 mt-2 mb-3">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="primary" size="lg" onClick={loadMoreHandler}>
                        Load More
                    </Button>
                </div>
            </Row>
        </div>
    )
}

export default Home
