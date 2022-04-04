import TopSong from "./TopSong";
import { AnimatePresence, motion } from "framer-motion"

export default function TopSongs({ elemRef, tracks }) {
    return (
        <motion.div
        ref={elemRef}
        className="bg-white"

        >
            <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layoutId="title"
                className="text-center text-xl font-bold my-4">Top songs of the month</motion.h4>
            <motion.div
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                id="top-tracks"
                className="grid grid-cols-2 lg:grid-cols-6 mx-2 gap-2">

                <AnimatePresence>
                    {tracks.items.map((track) => (
                        <TopSong key={track.id} track={track} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}