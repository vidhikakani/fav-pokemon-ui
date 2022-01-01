import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert";
import { signup } from "../services/user"
import UserContext from '../store/user-context'

const Signup = () => {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const [response, setResponse] = useState(null)

    const signupHandler = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const userObj = {
            "first_name": data.get("first_name"),
            "last_name": data.get("last_name"),
            "email": data.get("email"),
            "password": data.get("password")
        }

        const res = await signup(userObj)
        if (res.key === "success") {
            userCtx.addUser(res.user)
            navigate("/")
        } else {
            userCtx.removeUser()
        }
        setResponse(res)
    }

    return (
        <Container>
            <Row>
                <Col md="4" className='mx-auto mt-4'>
                    <form onSubmit={signupHandler}>
                        <p className="h4 text-center mb-4">Sign up</p>
                        <label htmlFor="first_name" className="grey-text">
                            First Name
                        </label>
                        <input type="text" id="first_name" name="first_name" className="form-control" />
                        <br />
                        <label htmlFor="last_name" className="grey-text">
                            Last Name
                        </label>
                        <input type="text" id="last_name" name="last_name" className="form-control" />
                        <br />
                        <label htmlFor="email" className="grey-text">
                            Email
                        </label>
                        <input type="email" id="email" name="email" className="form-control" />
                        <br />
                        <label htmlFor="password" className="grey-text">
                            Password
                        </label>
                        <input type="password" id="password" name="password" className="form-control" />
                        <br />
                        <div className="text-center mt-4">
                            <Button type="submit">Sign up</Button>
                        </div>
                        <p className="forgot-password text-right mt-2" style={{ display: "flex", justifyContent: "flex-end" }}>
                            Already have an account? <a href="/signin">Signin</a>
                        </p>
                    </form>
                </Col>
                <>
                    {response && (response.key === "error"
                        ? <Alert variant="danger">{response.detail}</Alert>
                        : ''
                    )}
                </>
            </Row>

        </Container>
    );
}

export default Signup
