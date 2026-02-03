import React, { forwardRef } from 'react';
import { Monitor, Palette, Zap } from 'lucide-react';
import { Theme } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ServiceCard } from '../ui/ServiceCard';

interface ServicesProps {
    theme: Theme;
    isExpertise: boolean;
}

export const Services = forwardRef<HTMLElement, ServicesProps>(({ theme, isExpertise }, ref) => {
    return (
        <section id="services" ref={ref} className="py-40 px-6 relative text-center">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 flex flex-col items-center gap-8">
                    <ScrollReveal className="max-w-3xl" scale>
                        <h2 className="text-xs font-black text-blue-500 tracking-[0.4em] uppercase mb-6">Expertise</h2>
                        <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-tight mb-8">
                            Our approach is <span className="text-blue-500">Atomic</span>.
                        </h3>
                        <p className={`text-xl max-w-2xl mx-auto ${isExpertise ? 'text-blue-950/60' : (theme === 'dark' ? 'text-white/50' : 'text-blue-950/50')
                            }`}>
                            From pixel-perfect UI to scalable architecture, we rebuild the standard for digital experiences.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <ScrollReveal className="delay-100" scale>
                        <ServiceCard
                            theme={theme}
                            isExpertise={isExpertise}
                            icon={Monitor}
                            title="Premium UX/UI"
                            description="Crafting sensory digital interfaces that captivate users and drive intentional interactions."
                        />
                    </ScrollReveal>
                    <ScrollReveal className="delay-200" scale>
                        <ServiceCard
                            theme={theme}
                            isExpertise={isExpertise}
                            icon={Zap}
                            title="Hyper Performance"
                            description="Websites engineered for speed. Load times measured in milliseconds, conversions measured in milestones."
                        />
                    </ScrollReveal>
                    <ScrollReveal className="delay-300" scale>
                        <ServiceCard
                            theme={theme}
                            isExpertise={isExpertise}
                            icon={Palette}
                            title="Visual Identity"
                            description="Beyond logos. We build complete visual languages that speak the dialect of luxury."
                        />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
});
Services.displayName = "Services";
