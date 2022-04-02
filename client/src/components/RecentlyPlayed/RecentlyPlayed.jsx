import RecentlyPlayedSong from "./RecentlyPlayedSong";
import { motion } from "framer-motion";
export default function RecentlyPlayed({ tracks }) {
    return (
        <>
            <motion.h4 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layoutId="title"
            className="text-center font-bold text-xl my-4">Recently Played Songs</motion.h4>
            <div id="top-tracks" className="flex flex-wrap items-stretch">
                {tracks.items.map((track, index) => (
                    <RecentlyPlayedSong key={index} track={track} />
                ))}



            </div>

        </>
    )
}