import React from 'react';
import { Zap } from 'lucide-react';
import { Theme } from '../../types';
import { TechLogos } from '../ui/Icons';

export const TechStackBanner = ({ theme, isExpertise }: { theme: Theme, isExpertise: boolean }) => {
    const techs = [
        { name: 'React', Icon: TechLogos.React },
        { name: 'TypeScript', Icon: TechLogos.TypeScript },
        { name: 'Python', Icon: TechLogos.Python },
        { name: 'Java', Icon: TechLogos.Java },
        { name: 'WordPress', Icon: TechLogos.WordPress },
        { name: 'Vite', Icon: TechLogos.Vite },
        { name: 'Three.js', Icon: TechLogos.Three },
        { name: 'HTML5', Icon: TechLogos.HTML5 },
        { name: 'CSS3', Icon: TechLogos.CSS3 },
        { name: 'Google Workspace', Icon: TechLogos.Google },
        { name: 'Tailwind CSS', Icon: () => <Zap className="w-8 h-8" /> },
    ];

    // Dynamic mask colors based on theme
    const maskColor = isExpertise
        ? '#F1F5F9' // blue-50 shade
        : (theme === 'dark' ? '#000814' : '#F8FAFC');

    return (
        <div className={`py-16 border-y relative overflow-hidden transition-colors duration-1000 ${isExpertise ? 'border-blue-100 bg-blue-50/30' : (theme === 'dark' ? 'border-white/5 bg-black/20' : 'border-blue-900/5 bg-blue-50/30')
            }`}>
            {/* Blending Gradients */}
            <div
                className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${maskColor} 15%, transparent)` }}
            />
            <div
                className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to left, ${maskColor} 15%, transparent)` }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none" />
            <div className="flex animate-scroll-right">
                {[...techs, ...techs, ...techs, ...techs].map((tech, i) => (
                    <div key={i} className={`flex items-center gap-6 px-16 group transition-all duration-700 ${isExpertise ? 'text-blue-900/80 hover:text-blue-600' : (theme === 'dark' ? 'text-white/60 hover:text-blue-400' : 'text-blue-900/60 hover:text-blue-600')
                        }`}>
                        <div className="scale-100 group-hover:scale-125 transition-transform duration-500">
                            <tech.Icon />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
