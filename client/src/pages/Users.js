import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"
import { FaUser, FaSearch } from "react-icons/fa"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet"

export default function Users() {

    const { data: users, status } = useQuery("users", () => fetch("/api/v1/user").then(res => res.json()), {
        staleTime: 60 * 1000,
    })

    function handleSearch() {
        (async () => {

            // if (searchQuery) {
            //     let users = await getUsers(searchQuery)
            //     setDisplayUsers(users)
            // } else {
            //     setDisplayUsers(users)
            // }
        })();
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch();
    }

    return (
        <div className="">

            <NavigationBar />

            {/* TODO: Implement Helmet */}
            <Helmet >
            </Helmet>

            <div className="jumbotron my-24">
                <h1>Users</h1>
                <h3>Users of Musicn</h3>

                <p>Spotify account not linked? Click <Link className="underline" to="/error/4">here</Link> to find out more!</p>
            </div>

            {/* <form onSubmit={handleSubmit}>

                <div className="flex flex-wrap justify-center">
                    <input type="text" className="mx-10 w-full md:w-1/2 border rounded-lg text-center" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or username" />

                    <div className="container">
                        <button className="btn">

                            <FaSearch className="text-center w-fit m-auto" />

                        </button>
                    </div>
                </div>
            </form> */}

            {
                status == "loading" && (
                    <div className="container">
                        <p className="text-center">Loading...</p>
                    </div>
                )
            }

            {
                status == "success" && (


                    <>
                        {users.map((user, index) => (
                            <div key={index} className="user mx-5 md:w-3/4 md:mx-auto my-5 bg-white rounded-lg border border-black/15 transition ease-out duration-300 hover:scale-105 hover:drop-shadow-lg">
                                <Link to={user.spotify_userid ? "/user/" + user.username : ""} className="w-full px-8 py-5 flex items-center">

                                    {user.profile_pic_url && user.profile_pic_url != "null" ?
                                        <img className="profile_picture rounded-full w-14 h-14 m-1" src={user.profile_pic_url} alt="profile picture" />
                                        :
                                        <div className="h-14 w-14 m-1 flex justify-center items-center bg-brand-color rounded-full">
                                            <FaUser className="fa fa-user text-lg text-center text-white/90" aria-hidden="true"></FaUser>
                                        </div>
                                    }

                                    <div className="ml-5">
                                        <p className="text-lg font-bold">{user.name && decodeURI(user.name)}</p>
                                        <p className="text-sm text-black/50">
                                            @{user.username}
                                        </p>

                                        {!user.spotify_userid && (
                                            <p className="text-sm text-black/30">
                                                Spotify account not linked
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </>

                )
            }


        </div>
    )
}