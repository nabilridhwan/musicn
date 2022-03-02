import { useEffect, useState } from "react"
import NavigationBar from "../components/NavigationBar"

export default function Users() {

    const [users, setUsers] = useState([])
    const [displayUsers, setDisplayUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState(null)

    useEffect(() => {
        fetch("/api/user")
            .then(res => res.json())
            .then(users => {
                setUsers(users)
                setDisplayUsers(users)
            })
    }, [])

    useEffect(() => {
        if (searchQuery) {
            setDisplayUsers(users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            setDisplayUsers(users)
        }
    }, [searchQuery])

    return (
        <div className="">

            <NavigationBar />

            <div className="jumbotron my-24">
                <h1>Users</h1>
                <h3>Users of Spotifyer</h3>
            </div>

            <div className="flex flex-wrap justify-center">
                <input type="text" className="mx-10 py-5 w-full border-solid border-1 border-black/50 text-center" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for users" />
            </div>

            {displayUsers.map((user, index) => (
                <a key={index} href={"/user/" + user.app_userid}>
                    <div className="user mx-10 my-5 py-5 flex flex-col justify-center items-center rounded-2xl bg-white drop-shadow-bg m-2 transition ease-out duration-500 hover:scale-110">

                        <img className="profile_picture rounded-full w-24 m-1" src={user.profile_pic_url} alt="profile picture" />
                        <p>{user.name}</p>
                    </div>
                </a>
            ))}
        </div>
    )
}