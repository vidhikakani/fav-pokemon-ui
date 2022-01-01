import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { signin } from '../services/user'
import UserContext from '../store/user-context'

const Login = () => {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const [response, setResponse] = useState(null)

    const signinHandler = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const userObj = {
            "username": data.get("email"),
            "password": data.get("password")
        }

        const res = await signin(userObj)
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
                    <form onSubmit={signinHandler}>
                        <p className="h4 text-center mb-4">Sign in</p>
                        <label htmlFor="email" className="grey-text">
                            Email
                        </label>
                        <input type="email" id="email" name="email" className="form-control" />
                        <br />
                        <label htmlFor="password" className="grey-text">
                            Password
                        </label>
                        <input type="password" id="password" name="password" className="form-control" />
                        <div className="text-center mt-4">
                            <Button type="submit">Sign in</Button>
                        </div>
                        <p className="forgot-password text-right mt-2" style={{ display: "flex", justifyContent: "flex-end" }}>
                            Don't have an account? <a href="/signup">Signup</a>
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

export default Login
