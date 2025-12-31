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
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 space-y-4"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm text-cyan-400 text-sm font-medium mb-4">
                    <Zap size={16} className="text-blue-500" />
                    <span>Powered by TensorFlow.js & Edge AI</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    Instant Rice <br className="hidden md:block" />
                    <span className="text-blue-500">Variety Detection</span>
                </h1>

                <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
                    Advanced machine learning running directly in your browser. zero latency,
                    100% private, enterprise-grade accuracy.
                </p>
            </motion.div>

            <div className="w-full max-w-xl mx-auto relative group flex flex-col gap-8">
                {/* Scanning Line Animation */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 z-0 pointer-events-none transition-opacity duration-500",
                    isLoading ? "opacity-100 animate-scan" : "opacity-0"
                )} />

                <div
                    {...getRootProps()}
                    className={cn(
                        "relative z-10 bg-slate-950/50 backdrop-blur-xl border-2 border-dashed rounded-3xl p-8 transition-all duration-300 overflow-hidden min-h-[400px] flex flex-col items-center justify-center gap-6",
                        isDragActive ? "border-blue-500 bg-blue-500/5" : "border-slate-800 hover:border-slate-700",
                        selectedImage ? "border-solid border-slate-700" : ""
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
                                <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-blue-500/50 transition-colors">
                                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xl font-medium text-white">
                                        Drop your image here
                                    </p>
                                    <p className="text-sm text-slate-400">
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
                                <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                                    <img
                                        src={selectedImage}
                                        alt="Selected rice"
                                        className="w-full h-full object-cover"
                                    />
                                    {isLoading && (
                                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-300">
                                            {/* Laser Scan Line */}
                                            <div className="absolute inset-0 overflow-hidden">
                                                <div className="w-full h-[2px] bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-scan top-0 absolute" />
                                            </div>

                                            <div className="z-10 flex flex-col items-center">
                                                <Scan className="w-12 h-12 text-blue-500 animate-pulse mb-4" />
                                                <p className="text-blue-400 font-mono text-sm tracking-wider animate-pulse">
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
                                            className="bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300"
                                        >
                                            Change Image
                                        </Button>
                                        <Button
                                            onClick={(e) => { e.stopPropagation(); startAnalysis(); }}
                                            disabled={!isModelReady}
                                            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 px-8"
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
                            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-2xl w-full ring-1 ring-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-white font-bold text-xl flex items-center gap-2">
                                            <CheckCircle2 className="text-green-500 w-5 h-5" />
                                            Analysis Complete
                                        </h3>
                                        <p className="text-slate-400 text-sm">Based on texture and shape analysis</p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={onClear} className="text-slate-500 hover:text-white">
                                        Reset
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {predictions.map((pred, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white font-medium">{pred.className}</span>
                                                <span className="text-blue-400 font-mono">{(pred.probability * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pred.probability * 100}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        idx === 0 ? "bg-gradient-to-r from-blue-600 to-cyan-400" : "bg-slate-600"
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
