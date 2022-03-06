import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export default function NavigationBar() {

    let [hasToken, setHasToken] = useState(false);
    let [pfp, setPfp] = useState("");

    useEffect(() => {
        setHasToken(false);
        if (cookie.get("jwt")) {
            setHasToken(true)

            fetch('/api/me', {
                method: "GET",
                credentials: "include"
            }).then(res => res.json())
                .then(([user]) => {
                    setPfp(user.profile_pic_url)
                })
        }

    }, [])
    return (
        <nav className="mx-5 my-6">
            <ul className="space-x-6">
                <li className="inline font-bold">
                    <Link to={"/"}>
                        Musicn
                    </Link>
                </li>
                <li className="inline"><Link to="/">Home</Link></li>
                <li className="inline"><Link to="/users">Users</Link></li>

                <div className="float-right space-x-6">
                    {hasToken ? (
                        <>
                            <li className="inline">
                                <Link to="/profile" className="flex justify-center items-center">

                                    {pfp ?
                                        <img className="w-8 h-8 rounded-full" src={pfp} alt="profile picture" />
                                        :
                                        <div className="h-8 w-8 flex justify-center items-center bg-spotify-green rounded-full">
                                            <FaUser className="fa fa-user text-sm text-center text-white/90" aria-hidden="true"></FaUser>
                                        </div>
                                    }

                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="inline"><Link to="/login">Login</Link></li>
                            <li className="inline"><Link to="/signup">Sign Up</Link></li>
                        </>
                    )}
                </div>


            </ul>


        </nav>
    )
}