import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Scan, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    onImageSelect: (file: File) => void;
    isLoading: boolean;
    selectedImage: string | null;
    predictions: { className: string; probability: number }[];
    startAnalysis: () => void;
    isModelReady: boolean;
    onClear: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    onImageSelect,
    isLoading,
    selectedImage,
    predictions,
    startAnalysis,
    isModelReady,
    onClear,
}) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onImageSelect(acceptedFiles[0]);
            }
        },
        [onImageSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
        disabled: isLoading,
    });

    return (
        <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center -mt-16 sm:-mt-10 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 space-y-4"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-900 text-sm font-medium mb-4">
                    <Zap size={16} className="text-black" />
                    <span>Powered by TensorFlow.js & Edge AI</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black">
                    Instant Rice <br className="hidden md:block" />
                    <span className="text-gray-500">Variety Detection</span>
                </h1>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
                    Advanced machine learning running directly in your browser. zero latency,
                    100% private, enterprise-grade accuracy.
                </p>
            </motion.div>

            <div className="w-full max-w-xl mx-auto relative group flex flex-col gap-8">
                {/* Scanning Line Animation removed for clean look or kept subtle black? Let's keep it subtle gray */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-200/50 to-gray-200/0 z-0 pointer-events-none transition-opacity duration-500",
                    isLoading ? "opacity-100 animate-scan" : "opacity-0"
                )} />

                <div
                    {...getRootProps()}
                    className={cn(
                        "relative z-10 bg-white/50 backdrop-blur-xl border-2 border-dashed rounded-3xl p-8 transition-all duration-300 overflow-hidden min-h-[400px] flex flex-col items-center justify-center gap-6",
                        isDragActive ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400",
                        selectedImage ? "border-solid border-gray-200" : ""
                    )}
                >
                    <input {...getInputProps()} />

                    <AnimatePresence mode="wait">
                        {!selectedImage ? (
                            <motion.div
                                key="upload-placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center text-center space-y-4"
                            >
                                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-black transition-colors">
                                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xl font-medium text-black">
                                        Drop your image here
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        or click to browse from your device
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="image-preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full flex flex-col items-center space-y-6"
                            >
                                <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                                    <img
                                        src={selectedImage}
                                        alt="Selected rice"
                                        className="w-full h-full object-cover"
                                    />
                                    {isLoading && (
                                        <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-300">
                                            {/* Laser Scan Line */}
                                            <div className="absolute inset-0 overflow-hidden">
                                                <div className="w-full h-[2px] bg-black shadow-[0_0_15px_rgba(0,0,0,0.5)] animate-scan top-0 absolute" />
                                            </div>

                                            <div className="z-10 flex flex-col items-center">
                                                <Scan className="w-12 h-12 text-black animate-pulse mb-4" />
                                                <p className="text-black font-mono text-sm tracking-wider animate-pulse font-bold">
                                                    ANALYZING STRUCTURE...
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!predictions.length && !isLoading && (
                                    <div className="flex gap-4">
                                        <Button
                                            variant="outline"
                                            onClick={(e) => { e.stopPropagation(); onClear(); }}
                                            className="bg-white border-gray-200 hover:bg-gray-50 text-black"
                                        >
                                            Change Image
                                        </Button>
                                        <Button
                                            onClick={(e) => { e.stopPropagation(); startAnalysis(); }}
                                            disabled={!isModelReady}
                                            className="bg-black hover:bg-gray-800 text-white shadow-lg px-8"
                                        >
                                            {!isModelReady ? "Loading Model..." : "Start Analysis"}
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Card */}
                <AnimatePresence>
                    {predictions.length > 0 && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="w-full"
                        >
                            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xl w-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-black font-bold text-xl flex items-center gap-2">
                                            <CheckCircle2 className="text-black w-5 h-5" />
                                            Analysis Complete
                                        </h3>
                                        <p className="text-gray-500 text-sm">Based on texture and shape analysis</p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={onClear} className="text-gray-500 hover:text-black">
                                        Reset
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {predictions.map((pred, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-black font-medium">{pred.className}</span>
                                                <span className="text-black font-mono font-bold">{(pred.probability * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pred.probability * 100}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        idx === 0 ? "bg-black" : "bg-gray-400"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HeroSection;
