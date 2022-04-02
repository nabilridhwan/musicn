import { FaSpotify } from "react-icons/fa"

export default function SpotifyButton({ href, text, profileButton }) {
    return (
        <a
            href={href}
            className={`btn flex mt-2 justify-center items-center bg-spotify-green hover:shadow-md hover:shadow-spotify-green/50 ${profileButton ? "w-full" : "w-fit mx-auto"}`}>
            <FaSpotify fontSize={20} className="text-white mr-2" aria-hidden="true" />

            {text && 
                text
            }
        </a>
    )
}