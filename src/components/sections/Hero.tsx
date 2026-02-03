import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Theme } from '../../types';
import { RayflectLogo } from '../ui/RayflectLogo';
import { ScrollReveal } from '../ui/ScrollReveal';
import { DynamicDesignWord } from '../ui/DynamicDesignWord';

export const Hero = ({ theme, onOpenContact }: { theme: Theme, onOpenContact: () => void }) => {
    return (
        <section className="relative pt-24 md:pt-32 pb-24 md:pb-32 px-6 min-h-[100svh] flex flex-col items-center justify-center text-center overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center justify-center flex-grow">
                <ScrollReveal scale>
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 md:mb-10">
                        <RayflectLogo className="w-4 h-4" />
                        Illuminating Digital Excellence
                    </div>

                    <h1 className="text-[11vw] sm:text-[9vw] md:text-8xl lg:text-[clamp(4rem,8.5vw,8.5rem)] font-black tracking-tighter leading-[0.85] mb-6 md:mb-10 uppercase flex flex-col items-center">
                        <span className="opacity-80">Reflecting</span>
                        <span className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
                            Premium
                            <DynamicDesignWord />
                        </span>
                    </h1>

                    <p className={`text-base md:text-xl lg:text-2xl max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed font-medium px-4 ${theme === 'dark' ? 'text-white/60' : 'text-blue-900/60'}`}>
                        RAYFLECT is a premium digital boutique crafting high-fidelity websites for brands that refuse to be ordinary. We turn vision into visual momentum.
                    </p>

                    {/* Main CTA Button */}
                    <div className="flex justify-center items-center px-4 w-full">
                        <button
                            onClick={onOpenContact}
                            className="w-full sm:w-auto min-w-[280px] px-12 py-5 md:py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full sm:rounded-[2rem] font-black text-lg md:text-xl transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-4 group hover:scale-105 active:scale-95"
                        >
                            Elevate Your Brand
                            <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll Indicator - Positioned precisely at the bottom */}
            <div className="flex flex-col items-center gap-2 opacity-40 pointer-events-none mt-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
            </div>
        </section>
    );
};
