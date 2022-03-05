import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPause, FaPlay, FaSpotify } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function SignUp() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (cookie.get("jwt")) {
            navigate("/profile")
        }
    }, [])

    async function handleSignUp() {
        console.log("Function called once")

        // Empty out the error first
        setError("")

        if (confirmPassword != password) {
            setError("Password does not match!")
        } else {
            fetch("/api/auth/app/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            }).then(res => {
                if (!res.ok) {
                    throw res
                } else {
                    navigate("/login")
                }
            })
                .catch(err => {
                    if (err.status == 409) {
                        setError("User already exists!")
                    }else{
                        setError("Something went wrong")
                    }
                })
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        handleSignUp();
    }

    return (
        <div>

            <NavigationBar />

            <div className="jumbotron my-10 flex flex-col items-center">
                <h1>
                    Sign Up
                </h1>
            </div>

            <p className="text-center italic text-lg">
                This is pretty awkward but please remember your password! You can't change it after <span className="font-bold">(for now)</span>
            </p>

            <p className="text-center text-red-500">
                {error}
            </p>

            <form onSubmit={handleSubmit}>


                <input type="email" id="email" required placeholder="Email" className="block border my-3 mx-auto" onChange={e => setEmail(e.target.value)} />

                <input type="text" id="username" required placeholder="Username" className="block border my-3 mx-auto" onChange={e => setUsername(e.target.value)} />

                <input type="password" id="password" required placeholder="Password" className="block border my-3 mx-auto" onChange={e => setPassword(e.target.value)} />

                <input type="password" id="confirm-password" required placeholder="Confirm Password" className="block border my-3 mx-auto" onChange={e => setConfirmPassword(e.target.value)} />

                <button id="spotify-profile-link"
                    className="flex mx-auto mt-6 justify-center items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:shadow-md hover:shadow-blue-500 transition ease-out duration-500">
                    Sign Up
                </button>
            </form>

        </div>
    )
}
