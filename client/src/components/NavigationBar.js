import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export default function NavigationBar() {

    let [profilePicUrl, setProfilePicUrl] = useState(localStorage.getItem("profile_pic_url"));

    return (
        <nav className="mx-5 my-6">
            <ul className="space-x-6">
                <li className="inline font-bold text-brand-color">
                    <Link to={"/"}>
                        Musicn
                    </Link>
                </li>
                <li className="inline"><Link to="/">Home</Link></li>
                <li className="inline"><Link to="/users">Users</Link></li>


                <div className="float-right space-x-6">
                    {profilePicUrl ? (
                        <>
                            <li className="inline">
                                <Link to="/profile">
                                    Profile
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