import React, { useEffect, useRef } from 'react';

export const GlowingCursor = () => {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (glowRef.current) {
                const { clientX: x, clientY: y } = e;
                // Stronger ambient glow
                glowRef.current.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <div
                ref={glowRef}
                className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-[9998] will-change-transform transition-transform duration-500 ease-out"
            />
        </>
    );
};
