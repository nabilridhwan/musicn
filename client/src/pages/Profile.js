import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaSpotify } from "react-icons/fa"
import NavigationBar from "../components/NavigationBar";
import Cookies from "universal-cookie";


const cookie = new Cookies();

export default function Profile() {

    const [user, setUser] = useState({})
    let navigate = useNavigate();

    const [username, setUsername] = useState("");

    useEffect(() => {
        if (document.cookie.length == 0) {
            window.location.href = "/login";
        }
        (async () => {
            let profile = await getUserProfile();
            setUser(profile[0])
            setUsername(profile[0].username)
        })();

    }, [])

    async function getUserProfile() {
        return fetch(`/api/me`, {
            credentials: "include"
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res
                }
            })
            .then(user => {
                console.log(user)
                return user
            }).catch(err => {
                console.log(err)
            })
    }

    async function handleChangeUsername() {
        fetch(`/api/me`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        }).then(res => res.json())
            .then(user => {
                navigate("/user/" + username)
            })
    }

    function handleLogout() {
        cookie.remove("jwt")
        navigate("/");
    }

    return (
        <div>

            <NavigationBar />

            <div className="jumbotron my-10 flex flex-col items-center">
                <h1>Profile</h1>

                <img src={user.profile_pic_url} className="profile_picture rounded-full w-24 h-24" />

                <h2 className="text-3xl font-bold">{user && user.name}</h2>
                <p className="text-sm text-black/50" id="follower-count-text">
                    @{user.username}
                </p>



            </div>

            <h1 className="text-center text-2xl font-bold">
                Edit Profile
            </h1>

            <input type="text" className="border rounded-lg w-full text-center" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />

            {username != user.username && <button className="border rounded-lg w-full text-center" onClick={() => {
                handleChangeUsername()
            }}>
                Save Username</button>}

            <button onClick={handleLogout} id="spotify-profile-link"
                href={"https://open.spotify.com/user/" + user.spotify_userid}
                className="flex mx-auto mt-6 justify-center items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:shadow-md hover:shadow-blue-500 transition ease-out duration-500">
                Log Out
            </button>


        </div>
    )
}
