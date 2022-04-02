import { FaSpotify } from "react-icons/fa"
import { motion } from "framer-motion"

export default function CurrentlyPlayingCard({ track: currentSong }) {
    return (
        <a className="block w-fit" href={currentSong.item.external_urls.spotify}>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
            className={`flex bg-white rounded-lg border w-fit m-auto transition ease-out items-center`}>


                <img src={currentSong.item.album.images[0].url} className="h-14 p-1.5" />

                <div className="mx-4">
                    <p className="font-bold">

                        {currentSong.hasOwnProperty("item") && currentSong.item.name.length > 25 ? (
                            currentSong.item.name.substring(0, 25) + "..."
                        ) : (
                            currentSong.item.name
                        )}

                    </p>
                    <p className="text-black/50 text-sm">{currentSong.item.artists.map(a => a.name).join(", ")}</p>
                </div>

            </motion.div>
        </a>
    )
}