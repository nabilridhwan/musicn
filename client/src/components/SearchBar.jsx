import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom";
import DefaultProfilePicture from "./DefaultProfilePicture";
export default function SearchBar() {

    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {

        if (searchTerm.length > 0) {
            const delayDebounceFn = setTimeout(async () => {
                let users = await fetch(`/api/v1/user?q=${searchTerm}`).then(res => res.json())
                setUsers(users.filter(user => user.spotify_userid));
                setShowSearchResults(true)
            }, 500)
            return () => clearTimeout(delayDebounceFn)
        } else {
            setUsers([]);
            setShowSearchResults(false);
        }

    }, [searchTerm])

    return (
        <div className="relative flex items-center">
            <input
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="outline-none px-4 border border-1 w-full md:w-fit border-black/20 focus:border-brand-color rounded-lg"
                type="text"
                placeholder="Search for a user"
                onChange={(e) => setSearchTerm(e.target.value)}
            />


            <AnimatePresence>
                {showSearchResults && (
                    <motion.div 
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0, y: 0 }}
                        layout="size"
                    className="absolute w-fit rounded-lg border bg-white drop-shadow-lg top-10 results">

                        {users.map((user, index) => (
                            <Link key={index} to={`/user/${user.username}`} className="block p-4 border-b border-black/20 last:border-none">
                                <div className="flex items-center">

                                    {user.profile_pic_url && user.profile_pic_url !== "null" ? (
                                        <img src={user.profile_pic_url} className="w-12 h-12 rounded-full" />
                                    ) : (
                                        <DefaultProfilePicture size={12} />
                                    )}

                                    <div className="ml-4">
                                        <div className="font-bold">{user.name}</div>
                                        <div className="muted text-sm">@{user.username}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {
                            users.length == 0 && (
                                <div className="p-4">
                                    <p className="text-center text-black/50">No users found</p>
                                </div>
                            )
                        }

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}