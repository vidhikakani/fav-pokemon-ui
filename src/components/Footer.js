import React from 'react'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

const Footer = () => {
    return (
        <div>
            <Navbar fixed="bottom">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand href="https://github.com/vidhikakani"
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        Developed by Vidhi Kakani
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer
