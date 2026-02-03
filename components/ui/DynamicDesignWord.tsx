import React, { useState, useEffect } from 'react';

const DYNAMIC_STYLES = [
    "italic font-serif text-blue-300",
    "font-black tracking-tighter text-white uppercase",
    "font-thin tracking-[0.2em] text-blue-100",
    "underline decoration-blue-500 underline-offset-8 text-white",
    "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white font-extrabold",
    "font-mono font-bold tracking-widest text-blue-200"
];

export const DynamicDesignWord = () => {
    const [styleIndex, setStyleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStyleIndex((prev) => (prev + 1) % DYNAMIC_STYLES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={`transition-all duration-700 ease-in-out inline-block ${DYNAMIC_STYLES[styleIndex]}`}>
            Design
        </span>
    );
};
