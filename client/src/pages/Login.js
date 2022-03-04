import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPause, FaPlay, FaSpotify } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (cookie.get("jwt")) {
            navigate("/profile")
        }
    }, [])

    async function handleLogin() {
        console.log(username, password)
        fetch("/api/auth/app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if (!res.ok) {
                throw res
            } else {
                return res.json()
            }
        })
            .then(data => {
                navigate("/profile")
            }).catch(err => {
                console.log("Error while logging in")
                console.log(err)
            })
    }

    function handleSubmit(e){
        e.preventDefault();
        handleLogin();
    }

    return (
        <div>

            <NavigationBar />

            <div className="jumbotron my-10 flex flex-col items-center">
                <h1>Login</h1>
            </div>

            <form onSubmit={handleSubmit}>


                <input type="text" id="username" placeholder="Username" className="block border my-3 mx-auto" onChange={e => setUsername(e.target.value)} />
                <input type="password" id="password" placeholder="Password" className="block border my-3 mx-auto" onChange={e => setPassword(e.target.value)} />

                <button onClick={handleLogin} id="spotify-profile-link"
                    className="flex mx-auto mt-6 justify-center items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:shadow-md hover:shadow-blue-500 transition ease-out duration-500">
                    Log In
                </button>
            </form>

        </div>
    )
}
