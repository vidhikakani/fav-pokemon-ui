import React from 'react'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

const Footer = () => {
    return (
        <Container fluid className="mt-3">
            <Navbar fixed="bottom" bg="light" variant="light">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand href="https://github.com/vidhikakani"
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        Developed by Vidhi Kakani
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </Container>
    )
}

export default Footer
