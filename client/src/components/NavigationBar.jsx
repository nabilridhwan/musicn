import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Cookies from "universal-cookie";
import SearchBar from "./SearchBar";
import logo from "../images/logo.png"
import DefaultProfilePicture from "./DefaultProfilePicture";
const cookie = new Cookies();

export default function NavigationBar() {

    return (
        <nav className="mx-5 my-6">
            <ul className="flex flex-wrap justify-center items-center space-x-6">
                <li className="inline font-bold text-brand-color">
                    <Link to={"/"}>
                        <img className="w-8" src={logo} />
                    </Link>
                </li>

                {/* {
                    document.cookie && (
                        <>
                            <li className="md:inline md:flex-1"><Link to="/share">Share</Link></li>
                        </>
                    )
                } */}

                {/* <li className="inline"><Link to="/users">Users</Link></li> */}

                <div className="md:flex-none flex-1">
                    <SearchBar />
                </div>




                <div className="float-right space-x-6">
                    {document.cookie ? (
                        <>
                            <li className="inline">

                                <Link to="/profile">
                                    {localStorage.profile_pic_url && localStorage.profile_pic_url !== "null" ? (
                                        <img className="w-8 rounded-full border" src={localStorage["profile_pic_url"]} />
                                    ) : (
                                        <DefaultProfilePicture size={8} />
                                    )}
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