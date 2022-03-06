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
                    }else if(err.status == 400){
                    setError("Usernames can only contain lowercase letters, underscores, periods and numbers");
                } else {
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

            <p className="text-lg text-center">
                Sign up to create an account
            </p>

            <div className="container">


                <p className="error mt-10">
                    {error}
                </p>

                <form onSubmit={handleSubmit}>


                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required placeholder="Email" className="block w-full" onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required placeholder="Username" className="block w-full" onChange={e => setUsername(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required placeholder="Enter your password" className="block w-full" onChange={e => setPassword(e.target.value)} />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" required placeholder="Re-enter your password" className="block w-full" onChange={e => setConfirmPassword(e.target.value)} />

                    <button 
                        className="flex w-full mx-auto mt-6 justify-center items-center px-3 py-3 bg-brand-color text-brand-text-color font-bold rounded-lg hover:shadow-md hover:shadow-brand-color/50 transition ease-out duration-500">
                        Sign Up
                    </button>
                </form>

                <p className="text-center">Have an account? <a href="/login">Login</a></p>
            </div>

        </div>
    )
}
