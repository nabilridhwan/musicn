import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Container from "../components/Container";
import FormGroup from "../components/FormGroup";
import NavigationBar from "../components/NavigationBar";

export default function SignUp() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        if (document.cookie.includes("loggedIn=true")) {
            console.log("User is logged in")
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
            fetch("/api/v1/auth/app/signup", {
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
                    return res.json()
                }
            }).then(data => {

                localStorage.setItem("profile_pic_url", data.profile_pic_url)
                navigate("/profile")

            })
                .catch(err => {
                    if (err.status == 409) {
                        setError("User already exists!")
                    } else if (err.status == 400) {
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
        <Container>

            <NavigationBar />

            <div className="jumbotron my-10 flex flex-col items-center">
                <h1>
                    Sign Up
                </h1>
            </div>

            <p className="text-lg text-center">
                Sign up to create an account
            </p>


            <p className="text-center">Have an account? <Link to="/login" className="underline">Login</Link></p>

            <div className="container">


                <p className="error mt-10">
                    {error}
                </p>

                <form onSubmit={handleSubmit}>


                    <FormGroup>

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required placeholder="Email" className="block w-full" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>


                    <FormGroup>

                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" required placeholder="Username" className="block w-full" onChange={e => setUsername(e.target.value)} />
                    </FormGroup>

                    <FormGroup>

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required placeholder="Enter your password" className="block w-full" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>

                    <FormGroup>

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" required placeholder="Re-enter your password" className="block w-full" onChange={e => setConfirmPassword(e.target.value)} />
                    </FormGroup>

                    <p className="text-center text-sm text-black/50">
                        By Signing up, you agree to <Link className="underline " to="/privacy-policy">
                            Musicn's Privacy Policy
                        </Link>
                    </p>

                    <FormGroup>
                        <button
                            className="btn my-6">
                            Sign Up
                        </button>
                    </FormGroup>
                </form>

            </div>

        </Container>
    )
}
