import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"
import { FaUser } from "react-icons/fa"

export default function Users() {

    const [users, setUsers] = useState([])
    const [displayUsers, setDisplayUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState(null)

    useEffect(() => {
        (async () => {
            let users = await getUsers();
            setUsers(users)
            setDisplayUsers(users)
        })();
    }, [])

    useEffect(() => {

        (async () => {

            if (searchQuery) {
                let users = await getUsers(searchQuery)
                setDisplayUsers(users)
            } else {
                setDisplayUsers(users)
            }
        })();
    }, [searchQuery])

    async function getUsers(query = "") {
        let url = `/api/user`
        if(query){
            url = `/api/user?q=${query}`
        }
        return await fetch(url)
            .then(res => res.json())
            .then(users => {
                return users
            })
    }

    return (
        <div className="">

            <NavigationBar />

            <div className="jumbotron my-24">
                <h1>Users</h1>
                <h3>Users of Musicn</h3>

                <p>Is your profile not showing? <Link className="underline" to="/error/1">Click here</Link> to find out more!</p>
            </div>

            {/* <div className="flex flex-wrap justify-center">
                <input type="text" className="mx-10 py-5 w-full md:w-1/2 border rounded-lg text-center" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for users" />
            </div> */}

            {displayUsers && displayUsers.length != 0 ? displayUsers.map((user, index) => (
                <a key={index} href={user.spotify_userid ? "/user/" + user.username : "#"}>
                    <div className="user w-full md:w-1/2 md:mx-auto my-5 py-5 px-8 flex items-center rounded-lg border bg-white m-2 transition ease-out duration-500 hover:scale-105 hover:drop-shadow-lg">

                        {user.profile_pic_url ?
                            <img className="profile_picture rounded-full w-24 m-1" src={user.profile_pic_url} alt="profile picture" />
                            :
                            <div className="h-24 w-24 m-1 flex justify-center items-center bg-spotify-green rounded-full">
                                <FaUser className="fa fa-user text-4xl text-center text-white/90" aria-hidden="true"></FaUser>
                            </div>
                        }

                        <div className="ml-5">
                            <p className="text-lg font-bold">{user.name}</p>
                            <p className="text-sm text-black/50">
                                @{user.username}
                            </p>

                            {!user.spotify_userid && (
                                <p className="text-sm text-black/30">
                                    Spotify account not linked
                                </p>
                            )}
                        </div>
                    </div>
                </a>
            ))

                :
                (

                    <p className="text-center my-10">No users found!</p>
                )

            }

        </div>
    )
}