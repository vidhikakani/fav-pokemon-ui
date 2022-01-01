import React from 'react'
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Button from "react-bootstrap/Button"

const PokemonCard = (props) => {
    const {
        pokemon: { id, name, height, weight, sprites, order },
        addToFavorite,
        removeFromFavorite,
        disableButton,
        isFavoritePokemon,
    } = props
    const pokemon_name = `${name[0].toUpperCase()}${name.substring(1)}`

    return (
        <Card>
            <Card.Header>{pokemon_name}</Card.Header>
            <Card.Img variant="top" src={sprites["front_default"]} />
            <ListGroup className="list-group-flush">
                <ListGroupItem>Rank: {order}</ListGroupItem>
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Height: {height}</span>
                        <span>Weight: {weight}</span>
                    </div>
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
                <div xs={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    {isFavoritePokemon && <Button
                        onClick={() => removeFromFavorite(id)}
                        disabled={disableButton}
                        variant="secondary"
                    >
                        Remove from Favorites
                    </Button>}
                    {!isFavoritePokemon && <Button
                        onClick={() => addToFavorite(id)}
                        variant="primary"
                        disabled={disableButton}
                    >
                        Add to Favorites
                    </Button>}
                </div>

            </Card.Body>
        </Card>
    )
}

export default PokemonCard
