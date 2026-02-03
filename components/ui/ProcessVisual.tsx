import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';

interface ProcessVisualProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ProcessVisual: React.FC<ProcessVisualProps> = ({ isOpen, onClose, onConfirm }) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            const timer = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
            const timer = setTimeout(() => setMounted(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <div className={`fixed inset-0 z-[99998] flex items-center justify-center p-4 transition-all duration-700 ${visible ? 'opacity-100 backdrop-blur-3xl bg-black/80' : 'opacity-0 backdrop-blur-none bg-transparent'}`}>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
                <X size={32} />
            </button>

            <div className={`relative w-full max-w-4xl flex flex-col items-center transition-all duration-700 delay-100 ${visible ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-20 opacity-0'}`}>

                {/* Image Container with Glow */}
                <div className="relative group mb-12">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
                        <img
                            src="/gatsby.png"
                            alt="Success"
                            className="w-full max-h-[60vh] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                        />

                        {/* Overlay Gradient on Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        {/* Quote or Text overlay on image (Optional, but adds to premium feel) */}
                        <div className="absolute bottom-0 left-0 w-full p-8 text-center bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-blue-200 text-sm font-bold tracking-[0.3em] uppercase mb-2">The Vision</p>
                            <h3 className="text-white text-3xl md:text-5xl font-black italic tracking-tighter">"Success is the Only Option"</h3>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => {
                        onClose();
                        setTimeout(onConfirm, 300); // Slight delay for smooth transition
                    }}
                    className="group relative px-12 py-6 bg-white text-black overflow-hidden rounded-full font-black text-xl md:text-2xl tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.5)]"
                >
                    <span className="relative z-10 flex items-center gap-4">
                        Initiate Protocol
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0 opacity-10" />
                </button>

            </div>
        </div>,
        document.body
    );
};
