import { motion } from "framer-motion";

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
            <div className="text-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl font-bold tracking-tighter text-black mb-2">
                        Berasku
                    </h1>
                    <p className="text-gray-500 text-sm tracking-[0.5em] uppercase">
                        AI Rice Detection
                    </p>
                </motion.div>

                {/* Subtle Pulse Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gray-100 rounded-full blur-3xl animate-pulse -z-0" />
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
