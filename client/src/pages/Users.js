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
                <h3>Users of Musicn</h3>
            </div>

            <div className="flex flex-wrap justify-center">
                <input type="text" className="mx-10 py-5 w-full md:w-1/2 border rounded-lg text-center" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for users" />
            </div>

            {displayUsers && displayUsers.length != 0 ? displayUsers.map((user, index) => (
                <a key={index} href={"/user/" + user.username}>
                    <div className="user w-full md:w-1/2 md:mx-auto my-5 py-5 px-8 flex items-center rounded-lg border bg-white m-2 transition ease-out duration-500 hover:scale-105 hover:drop-shadow-lg">
                        <img className="profile_picture rounded-full w-24 m-1" src={user.profile_pic_url} alt="profile picture" />

                        <div className="ml-5">
                            <p className="text-lg font-bold">{user.name}</p>
                            <p className="text-sm text-black/50">
                                @{user.username}
                            </p>
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