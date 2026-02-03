import React from 'react';
import { Theme } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PortfolioItem } from '../ui/PortfolioItem';

export const Work = ({ theme }: { theme: Theme }) => {
    return (
        <section id="work" className="py-40 px-6 text-center">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="mb-32" scale>
                    <h2 className="text-xs font-black text-blue-500 tracking-[0.4em] uppercase mb-8">Showcase</h2>
                    <h3 className="text-6xl md:text-9xl font-black tracking-tighter uppercase">Recent <br />Reflections.</h3>
                </ScrollReveal>

                <div className="grid grid-cols-1 gap-24">
                    <ScrollReveal scale>
                        <PortfolioItem
                            theme={theme}
                            title="Titan Asset Management"
                            category="Corporate Finance"
                            img="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop"
                        />
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <ScrollReveal scale>
                            <PortfolioItem
                                theme={theme}
                                title="Aura Wellness"
                                category="Direct to Consumer"
                                img="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
                            />
                        </ScrollReveal>
                        <ScrollReveal scale>
                            <PortfolioItem
                                theme={theme}
                                title="CyberCore Solutions"
                                category="SaaS Architecture"
                                img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                            />
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};
