// TODO: Change to luxono
import relativeDate from "relative-date";
import { motion } from "framer-motion";
export default function RecentlyPlayedSong({ track }) {

    return (
        <motion.div 
        layout="position"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full hover:drop-shadow-lg transition ease-out duration-500">

            <a href={track.track.external_urls.spotify} className="flex mx-5 my-2 bg-white border items-center">

                <img src={track.track.album.images[0].url} className="w-24 h-24" />

                <div className="ml-3" >
                    <p className="text-black/30 text-xs uppercase tracking-wide">
                        {relativeDate(new Date(track.played_at))}
                    </p>

                    <h1 className="md:text-left text-black font-bold">
                        {track.track.name}
                    </h1>
                    <p className="md:text-left text-black/50 text-sm">
                        {track.track.artists.map(a => a.name).join(", ")}
                    </p>

                </div>

            </a>

        </motion.div>
    )
}