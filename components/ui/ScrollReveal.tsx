import React, { useState, useEffect, useRef } from 'react';

export const ScrollReveal = ({ children, className = "", scale = false }: { children?: React.ReactNode, className?: string, scale?: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : `opacity-0 translate-y-12 ${scale ? 'scale-[0.92]' : ''}`
                } ${className}`}
        >
            {children}
        </div>
    );
};
