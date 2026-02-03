import React, { useEffect, useRef } from 'react';

export const SunlightEffect = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
                containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            style={{
                background: `radial-gradient(800px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(255, 240, 200, 0.4), transparent 80%)`,
            } as any}
        >
            <div
                className="absolute w-full h-full"
                style={{
                    background: `radial-gradient(200px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(255, 255, 255, 0.9), transparent 70%)`,
                }}
            />
            {/* Rays - Optimized Conic Gradient */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `repeating-conic-gradient(from 0deg at var(--mouse-x, -1000px) var(--mouse-y, -1000px), transparent 0deg, white 2deg, transparent 8deg)`,
                    maskImage: `radial-gradient(circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent 80%)`,
                    WebkitMaskImage: `radial-gradient(circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent 80%)`
                }}
            />
        </div>
    );
};
