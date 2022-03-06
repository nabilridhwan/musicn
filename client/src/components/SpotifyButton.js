import { FaSpotify } from "react-icons/fa"

export default function SpotifyButton({ href, text }) {
    return (
        <a
            href={href}
            className="flex mx-auto w-fit mt-2 justify-center items-center px-3 py-2 bg-spotify-green text-white rounded-lg hover:shadow-md hover:shadow-spotify-green/50 transition ease-out duration-500">
            <FaSpotify className="fa fa-spotify text-1xl text-center text-white mr-2" aria-hidden="true" />

            {text && 
                text
            }
        </a>
    )
}