import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaExclamationTriangle, FaSpotify, FaUser } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import Cookies from "universal-cookie";
import { useQuery } from "react-query";
import queryClient from "../utils/queryClient";
import Container from "../components/Container";
import FormGroup from "../components/FormGroup";

let reauth_url = "/api/v1/auth";
let unlink_url = "/api/v1/auth/unlink";

if (process.env.NODE_ENV != "production") {
    reauth_url = "http://localhost:4000/api/v1/auth";
    unlink_url = "http://localhost:4000/api/v1/auth/unlink";
}

export default function Profile() {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    let navigate = useNavigate();


    const { data: user, status: userStatus, isFetched } = useQuery("me", () => fetch(`/api/v1/me`, { credentials: "include" }).then(res => res.json()).then(data => data[0]), {
    })

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (isFetched) {
            console.log("Got user data")
            setEmail(user.email)
            setDisplayName(decodeURI(user.name))
            setUsername(user.username)
        }
    }, [isFetched])


    async function handleUpdate(e) {
        e.preventDefault()

        setSuccess("");
        setError("");
        fetch(`/api/v1/me`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                name: displayName,
            })
        }).then(res => {
            if (!res.ok) {
                throw res
            } else {
                // Re-get the user profile again
                // Invalidate request
                queryClient.invalidateQueries("me")

                setSuccess("Profile updated!")
            }
        })
            .catch(async err => {
                let res = await err.json()
                console.log(res)
                if (res.message) {
                    setError(res.message)
                } else {
                    setError("Something went wrong while updating your profile")
                }
            })
    }

    function handleLogout() {
        fetch("/api/v1/auth/app/logout")
            .then(res => res.json())
            .then(data => {
                navigate("/")
            })
    }

    function handleUnlink() {
        console.error("Feature not implemented")
    }

    return (
        <Container>



            <NavigationBar />

            {userStatus == "success" && (
                <>
                    <div className="my-10 flex flex-col items-center">

                        {user.profile_pic_url && user.profile_pic_url != "null" ?
                            <img className="profile_picture rounded-full w-24 m-1" src={user.profile_pic_url} alt="profile picture" />
                            :
                            <div className="h-24 w-24 m-1 flex justify-center items-center bg-brand-color rounded-full">
                                <FaUser className="fa fa-user text-4xl text-center text-white/90" aria-hidden="true"></FaUser>
                            </div>
                        }

                        <h2 className="text-3xl font-bold text-center">{user && user.name != null && decodeURI(user.name)}</h2>
                        <p className="text-sm text-black/50 text-center" id="follower-count-text">
                            @{user.username}
                        </p>

                        {user.refresh_token &&
                            (
                                <Link to={"/user/" + user.username} id="spotify-profile-link"
                                    className="btn w-fit mx-auto mt-5 flex items-center">
                                    <FaUser className="mr-2" />
                                    Profile page
                                </Link>
                            )

                        }

                        {!user.refresh_token ? (

                            <div className="container">

                                <div className="mt-6 flex-col md:flex-row bg-white border border-black/20 drop-shadow-lg p-10 rounded-2xl">
                                    <FaExclamationTriangle className="text-red-500 text-4xl" />

                                    <div className="mt-2">
                                        <p className="font-bold text-2xl text-left">
                                            Link your Spotify Account
                                        </p>

                                        <p className="text-left text-black/50">
                                            Your friends won’t be able to see your Spotify statistics unless you link your Spotify account!
                                        </p>

                                        <a id="spotify-profile-link"
                                            href={reauth_url}
                                            className="flex mt-5 justify-center items-center px-3 py-2 bg-spotify-green text-white rounded-lg hover:shadow-md hover:shadow-spotify-green/50 transition ease-out duration-500">
                                            <FaSpotify className="fa fa-spotify text-1xl text-center text-white mr-2" aria-hidden="true"></FaSpotify>
                                            Link your Spotify
                                        </a>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <>
                                <a href={reauth_url} id="spotify-profile-link"
                                    className="flex items-center btn w-fit my-6 bg-spotify-green hover:shadow-spotify-green/50 text-white">
                                    <FaSpotify fontSize={24} className="mr-4" />
                                    Re-link Spotify Account
                                </a>

                                <button href={unlink_url}
                                    onClick={handleUnlink}
                                    disabled
                                    className="flex items-center btn w-fit bg-red-500 hover:shadow-red/50 text-white disabled:bg-black/40 disabled:hover:shadow-none disabled:text-white/50">
                                    <FaSpotify fontSize={24} className="mr-4" />
                                    Unlink Spotify Account
                                </button>
                            </>
                        )}



                    </div>

                    <div className="container">


                        <p className="text-red-500 text-center">
                            {error}
                        </p>

                        <p className="text-green-500 text-center">
                            {success}
                        </p>

                        <h1 className="text-center text-2xl font-bold">
                            Edit Profile
                        </h1>

                        <form onSubmit={handleUpdate}>

<FormGroup>
                            <label htmlFor="displayName">
                                Display Name
                            </label>

                            {displayName && displayName != "null" ? (



                                <input type="text" name="displayName" id="displayName" placeholder="Display Name" value={displayName} className="block w-full" onChange={(e) => setDisplayName(e.target.value)} />

                            )

                                :

                                <input disabled type="text" name="displayName" id="displayName" placeholder="Display Name" value={displayName} className="block w-full" onChange={(e) => setDisplayName(e.target.value)} />

                            }
</FormGroup>

<FormGroup>

                            <label htmlFor="email">
                                Email
                            </label>

                            <input type="email" name="email" id="email" placeholder="Email" value={email} className="block w-full" onChange={(e) => setEmail(e.target.value)} />
</FormGroup>

<FormGroup>



                            <label htmlFor="username">
                                Username
                            </label>

                            <input type="text" required id="username" placeholder="Username" value={username} className="block w-full" onChange={e => setUsername(e.target.value)} />
</FormGroup>

                            <button className="btn">
                                Update Profile
                            </button>
                        </form>

                        <button onClick={handleLogout}
                            className="btn my-5 bg-red-500 hover:shadow-red-500/50">
                            Log Out
                        </button>
                    </div>

                </>

            )}



        </Container>
    )
}
