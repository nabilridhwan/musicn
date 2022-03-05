import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPause, FaPlay, FaSpotify } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (cookie.get("jwt")) {
            navigate("/profile")
        }
    }, [])

    async function handleLogin() {
        setError("");
        fetch("/api/auth/app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
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
                if (err.status === 401) {
                    setError("Invalid email or password")
                } else if (err.status == 404) {
                    setError("User not found")
                } else {
                    setError("Something went wrong")
                }
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin();
    }

    return (
        <div >

            <NavigationBar />


            <div className="container">

                <div className="jumbotron my-10 flex flex-col items-center">
                    <h1>Login</h1>

                    <p className="mt-2 text-lg">
                        Log in into your Musicn account
                    </p>
                </div>

                <p className="error">
                    {error}
                </p>

                <form onSubmit={handleSubmit}>


                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email" placeholder="johndoe@email.com" className="block w-full" onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" placeholder="Enter your password" className="block w-full" onChange={e => setPassword(e.target.value)} />

                    <button
                        className="flex w-full mx-auto mt-6 justify-center items-center px-3 py-3 bg-brand-color text-brand-text-color font-bold rounded-lg hover:shadow-md hover:shadow-brand-color/50 transition ease-out duration-500">
                        Log In
                    </button>
                </form>

            </div>

        </div>
    )
}
