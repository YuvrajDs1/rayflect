import React from 'react';
import { Theme } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';

export const CTA = ({ theme, onOpenContact }: { theme: Theme, onOpenContact: () => void }) => {
    return (
        <section className="py-60 px-6 relative overflow-hidden bg-blue-600 text-center">
            <div className="max-w-5xl mx-auto text-center relative z-10">
                <ScrollReveal scale>
                    <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-none text-white">
                        Start the <br />Reflection.
                    </h2>
                    <p className="text-2xl mb-16 max-w-2xl mx-auto text-blue-100 font-medium">
                        Let's discuss how RAYFLECT can illuminate your brand's true potential in the digital landscape.
                    </p>
                    <button
                        onClick={onOpenContact}
                        className="px-16 py-8 bg-white text-blue-600 rounded-full font-black text-2xl transition-all transform hover:scale-105 shadow-4xl hover:shadow-white/20"
                    >
                        Let's Talk Business
                    </button>
                </ScrollReveal>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-white/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/5 rounded-full" />
        </section>
    );
};
