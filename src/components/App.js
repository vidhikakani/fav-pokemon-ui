import React, { useEffect, useContext } from "react"
import { Routes, Route, Link } from "react-router-dom"
import NavBar from "./Navbar";
import Home from "../containers/Home"
import MyFavorites from "../containers/MyFavorites"
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import { fetchMyFavoritePokemons, getUser } from "../services/user";
import UserContext from '../store/user-context'

const App = () => {
    const { addUser, upsertFavoritePokemons } = useContext(UserContext)

    useEffect(() => {
        (async () => {
            const access_token = localStorage.getItem("token")
            if (access_token) {
                const { user } = await getUser(access_token, "bearer")
                const { favorites } = await fetchMyFavoritePokemons(access_token)
                addUser(user)
                upsertFavoritePokemons(favorites)
            }
        })()

        return () => { }
    }, [])

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="favorites" element={<MyFavorites />} />
                <Route path="signin" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </div>
    )
}

export default App