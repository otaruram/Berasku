import React from "react";
import { motion } from "framer-motion";
import { Microscope, BrainCircuit, Box, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: Microscope,
        title: "Manual Error Prone",
        description: "Traditional visual inspection is subjective, slow, and leads to mixed-quality rice batches affecting market value.",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20"
    },
    {
        icon: BrainCircuit,
        title: "Edge AI Solution",
        description: "Our MobileNetV2 model runs locally in your browser. No server uploads, preserving data privacy with zero latency.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        icon: Box,
        title: "Instant Classification",
        description: "Get immediate results for Jasmine, Basmati, IR64, and more with 99.8% confirmed accuracy.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20"
    }
];

const StoryTellingSection = () => {
    return (
        <section className="py-24 px-4 relative z-0 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`relative p-8 rounded-3xl border border-gray-200 bg-white shadow-lg group hover:scale-[1.02] transition-transform duration-300`}
                        >
                            <div className={`p-4 rounded-2xl bg-gray-50 w-fit mb-6 border border-gray-100 group-hover:border-black transition-colors`}>
                                <step.icon className={`w-8 h-8 text-black`} />
                            </div>

                            <h3 className="text-2xl font-bold text-black mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {step.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                                Learn more <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center border-t border-gray-200 pt-16"
                >
                    <p className="text-gray-500 mb-6 font-mono text-sm uppercase tracking-widest">Powered By</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple text placeholders for tech stack logos, ideally these would be svgs */}
                        <span className="text-xl font-bold text-black flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full"></div>TensorFlow.js</span>
                        <span className="text-xl font-bold text-black flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full"></div>React</span>
                        <span className="text-xl font-bold text-black flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full"></div>Tailwind CSS</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StoryTellingSection;
