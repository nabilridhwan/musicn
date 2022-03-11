import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavigationBar from "../components/NavigationBar";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        // Check if the user is logged in
        fetch("/api/v1/me", {
            credentials: "include"
        }).then(res => {
            if (res.ok) {
                navigate("/profile")
            }
        }).then(_ => {
            setLoaded(true)
        })
    }, [])

    async function handleLogin() {
        setError("");
        fetch("/api/v1/auth/app/login", {
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
                localStorage.setItem("profile_pic_url", data.profile_pic_url)
                navigate("/profile")
            }).catch(err => {
                if (err.status === 401) {
                    setError("Invalid email, username or password")
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


            {loaded && (


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


                        <label htmlFor="email">Email or Username</label>
                        <input type="text" required id="email" placeholder="Email or Username" className="block w-full" onChange={e => setEmail(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <input type="password" required id="password" placeholder="Enter your password" className="block w-full" onChange={e => setPassword(e.target.value)} />

                        <button
                            className="btn">
                            Log In
                        </button>
                    </form>

                </div>
            )}

        </div>
    )
}
