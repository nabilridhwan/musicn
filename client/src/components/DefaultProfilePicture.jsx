import { FaUser } from "react-icons/fa"

export default function DefaultProfilePicture({size}) {
    return (
        <div className={`h-${size} w-${size} m-1 flex justify-center items-center bg-brand-color rounded-full`}>
            <FaUser className="fa fa-user text-lg text-center text-white/90" aria-hidden="true"></FaUser>
        </div>
    )
}