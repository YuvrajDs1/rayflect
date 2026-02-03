import React from 'react';
import { Theme } from '../../types';
import { useScrollY } from '../../hooks/useScrollY';

export const AnimatedBackground = ({ theme, isExpertise = false }: { theme: Theme, isExpertise?: boolean }) => {
    const scrollY = useScrollY();

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Base Dark Theme Background */}
            <div className={`absolute inset-0 transition-colors duration-[1500ms] ease-in-out ${theme === 'dark' ? 'bg-[#000814]' : 'bg-[#F8FAFC]'
                }`} />

            {/* Expertise White Overlay Layer - Using Opacity for better performance */}
            <div className={`absolute inset-0 bg-white transition-opacity duration-[1800ms] ease-in-out will-change-opacity ${isExpertise ? 'opacity-100' : 'opacity-0'
                }`} />

            {/* Background Shapes - Always Rendered but Faded Out when expertise is active */}
            <div className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${isExpertise ? 'opacity-0' : 'opacity-100'
                }`}>
                <div
                    className="absolute top-[-25%] left-[-15%] w-[80%] h-[80%] bg-blue-600/15 blur-[120px] animate-pulse rounded-full transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(0, ${scrollY * -0.2}px, 0)` }}
                />
                <div
                    className="absolute bottom-[-30%] right-[-15%] w-[90%] h-[90%] bg-blue-900/15 blur-[150px] animate-pulse rounded-full delay-1000 transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(0, ${scrollY * -0.35}px, 0)` }}
                />
                <div
                    className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-400/10 blur-[100px] animate-pulse rounded-full transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(0, ${scrollY * -0.1}px, 0)` }}
                />

                {/* Floating Beams */}
                <div
                    className="absolute top-0 left-[20%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
                    style={{ transform: `translate3d(0, ${scrollY * -0.15}px, 0)` }}
                />
                <div
                    className="absolute top-0 left-[80%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
                    style={{ transform: `translate3d(0, ${scrollY * -0.3}px, 0)` }}
                />

                <div className="absolute top-0 left-[50%] w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent animate-scan" />
            </div>
        </div>
    );
};
