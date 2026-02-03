import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Theme } from '../../types';
import { RayflectLogo } from '../ui/RayflectLogo';

export const Navbar = ({ theme, toggleTheme, onOpenContact, onOpenProcess, isExpertise = false }: { theme: Theme, toggleTheme: () => void, onOpenContact: () => void, onOpenProcess: () => void, isExpertise?: boolean }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'backdrop-blur-xl bg-opacity-80 border-b shadow-2xl' : 'bg-transparent'
            } ${scrolled
                ? (isExpertise ? 'bg-white/70 border-blue-100' : (theme === 'light' ? 'bg-white/70 border-white/10' : 'bg-[#000814]/70 border-white/10'))
                : ''
            }`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="transition-transform duration-500 group-hover:rotate-[45deg] group-hover:scale-110">
                        <RayflectLogo className="w-10 h-10" />
                    </div>
                    <span className={`text-2xl font-black tracking-tighter ${isExpertise ? 'text-blue-900' : (theme === 'dark' ? 'text-white' : 'text-blue-900')
                        }`}>
                        RAY<span className="text-blue-500">FLECT</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {['Services', 'Work', 'Process'].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                if (item === 'Process') {
                                    onOpenProcess();
                                } else {
                                    const element = document.getElementById(item.toLowerCase());
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className={`text-sm font-bold tracking-wide uppercase transition-colors hover:text-blue-500 ${isExpertise ? 'text-blue-900/70' : (theme === 'dark' ? 'text-white/70' : 'text-blue-900/70')
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isExpertise ? 'bg-blue-900/10 text-blue-900' : (theme === 'dark' ? 'bg-white/10 text-yellow-400' : 'bg-blue-900/10 text-blue-900')
                            }`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={onOpenContact}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/30 active:scale-95"
                    >
                        Start Project
                    </button>
                </div>

                <button className="md:hidden text-blue-500 z-50" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#000814] z-40 transition-all duration-700 flex flex-col items-center justify-center gap-10 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'}`}>
                {['Services', 'Work', 'Process'].map((item) => (
                    <button
                        key={item}
                        onClick={() => {
                            setIsOpen(false);
                            if (item === 'Process') {
                                onOpenProcess();
                            } else {
                                const element = document.getElementById(item.toLowerCase());
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="text-4xl font-black uppercase tracking-tighter hover:text-blue-500 transition-colors"
                    >
                        {item}
                    </button>
                ))}
                <div className="flex items-center gap-6 mt-4">
                    <button
                        onClick={toggleTheme}
                        className="p-4 rounded-full bg-white/5 text-yellow-400"
                    >
                        {theme === 'dark' ? <Sun size={28} /> : <Moon size={28} />}
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onOpenContact();
                        }}
                        className="bg-blue-600 text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-600/40"
                    >
                        Start Project
                    </button>
                </div>
            </div>
        </nav>
    );
};
