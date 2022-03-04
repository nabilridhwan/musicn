import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export default function NavigationBar(){
    return(
        <nav className="mx-5 my-2">
            <div className="flex items-center">

            <p className="font-bold text-center my-3">Musicn</p>
            <ul className="ml-10 flex">
                <li className="mx-3"><Link to="/">Home</Link></li>
                <li className="mx-3"><Link to="/users">Users</Link></li>

                {cookie.get("jwt") ? (
                    <>
                        <li className="mx-3"><Link to="/profile">Profile</Link></li>
                    </>
                ) : (
                    <>
                <li className="mx-3"><Link to="/login">Login</Link></li>
                <li className="mx-3"><Link to="/signup">Sign Up</Link></li>
                </>
                )}
            </ul>
            </div>
        </nav>
    )
}