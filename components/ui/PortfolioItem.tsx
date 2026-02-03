import React, { useRef, useState } from 'react';
import { Theme } from '../../types';

export const PortfolioItem = ({ title, category, img, theme }: { title: string, category: string, img: string, theme: Theme }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isInside, setIsInside] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsInside(true)}
            onMouseLeave={() => setIsInside(false)}
            onMouseMove={handleMouseMove}
            className="group relative aspect-[16/10] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-3xl bg-blue-950"
        >
            {/* Background Image */}
            <img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:opacity-100"
            />

            {/* Cursor Proximity Spotlight Layer */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isInside ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
                }}
            />

            {/* Main Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-all duration-700 p-10 flex flex-col justify-end items-center text-center">
                <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center">
                    <span className="text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">
                        {category}
                    </span>
                    <h4 className="text-white text-3xl md:text-4xl font-black tracking-tighter uppercase mb-6">
                        {title}
                    </h4>
                    <div className="mt-2 px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="text-white text-xs font-black tracking-[0.3em] uppercase">
                            Coming Soon
                        </span>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/0 group-hover:border-white/10 transition-colors duration-700 pointer-events-none" />
        </div>
    );
};
