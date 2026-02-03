import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Theme } from '../../types';

export const ServiceCard = ({ icon: Icon, title, description, theme, isExpertise = false }: { icon: any, title: string, description: string, theme: Theme, isExpertise?: boolean }) => (
    <div className={`p-8 rounded-[2rem] border transition-all duration-700 group relative overflow-hidden h-full flex flex-col items-center text-center ${isExpertise
        ? 'bg-blue-50/50 border-blue-100 hover:bg-white hover:border-blue-300'
        : (theme === 'dark'
            ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50'
            : 'bg-blue-50 border-blue-100 hover:bg-white hover:border-blue-300 shadow-xl shadow-transparent hover:shadow-blue-900/5')
        }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6 ${isExpertise ? 'bg-white shadow-lg' : (theme === 'dark' ? 'bg-blue-900/30' : 'bg-white shadow-lg')
            }`}>
            <Icon className="text-blue-500 w-8 h-8" />
        </div>
        <h3 className={`text-2xl font-black mb-4 uppercase tracking-tight ${isExpertise ? 'text-blue-900' : (theme === 'dark' ? 'text-white' : 'text-blue-900')
            }`}>{title}</h3>
        <p className={`leading-relaxed text-lg ${isExpertise ? 'text-blue-950/70' : (theme === 'dark' ? 'text-white/60' : 'text-blue-900/60')
            }`}>{description}</p>
        <div className="mt-8 flex items-center gap-2 text-blue-500 font-black text-sm uppercase tracking-widest cursor-pointer opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            Explore Service <ArrowRight size={16} />
        </div>
    </div>
);
