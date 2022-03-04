import { Link } from "react-router-dom";

export default function NavigationBar(){
    return(
        <nav className="mx-5 my-2">
            <div className="flex items-center">

            <p className="font-bold text-center my-3">Musicn</p>
            <ul className="ml-10 flex">
                <li className="mx-3"><Link to="/">Home</Link></li>
                <li className="mx-3"><Link to="/users">Users</Link></li>
                <li className="mx-3"><Link to="/login">Login</Link></li>
            </ul>
            </div>
        </nav>
    )
}