import { motion } from "framer-motion"
export default function TopSong({ track }) {

    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => window.open(track.external_urls.spotify, "_blank")}
            className="bg-white border cursor-pointer hover:shadow-lg transition ease-out duration-300">

            <img src={track.album.images[0].url} className="w-fit h-auto" />

            <div className="py-4">
                <h1 className="text-black text-center font-bold">
                    {track.name}
                </h1>
                <p className="text-black/50 text-xs md:text-sm text-center">
                    {track.artists.map(a => a.name).join(", ")}
                </p>
            </div>

        </motion.div>
    )
}