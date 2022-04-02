import { motion } from "framer-motion"
export default function Container({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-11/12 my-5 mx-auto">
            {children}
        </motion.div>
    )
}