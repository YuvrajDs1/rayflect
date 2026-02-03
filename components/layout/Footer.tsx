import React, { useState } from 'react';
import { Theme } from '../../types';
import { RayflectLogo } from '../ui/RayflectLogo';
import { LegalModal } from '../ui/LegalModal';

export const Footer = ({ theme, onOpenContact }: { theme: Theme, onOpenContact: () => void }) => {
    const [legalOpen, setLegalOpen] = useState(false);
    const [legalType, setLegalType] = useState<'privacy' | 'terms'>('privacy');

    const openLegal = (type: 'privacy' | 'terms') => {
        setLegalType(type);
        setLegalOpen(true);
    };

    return (
        <footer className={`py-32 px-6 border-t text-center lg:text-left ${theme === 'dark' ? 'border-white/5 bg-black' : 'border-blue-950/5 bg-blue-50'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3 mb-10">
                        <RayflectLogo className="w-10 h-10" />
                        <span className={`text-3xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                            RAY<span className="text-blue-500">FLECT</span>
                        </span>
                    </div>
                    <p className={`text-xl mb-10 leading-relaxed max-w-md ${theme === 'dark' ? 'text-white/50' : 'text-blue-950/50'}`}>
                        Designing the future, reflecting excellence. We are a global creative agency dedicated to high-impact digital experiences.
                    </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-xs text-blue-500">Navigation</h4>
                        <ul className={`space-y-4 font-bold ${theme === 'dark' ? 'text-white/70' : 'text-blue-950/70'}`}>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Services</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Our Work</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors" onClick={(e) => { e.preventDefault(); onOpenContact(); }}>Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-xs text-blue-500">Inquiries</h4>
                        <ul className={`space-y-4 font-bold ${theme === 'dark' ? 'text-white/70' : 'text-blue-950/70'}`}>
                            <li>rayflect.agency@gmail.com</li>
                            <li>+91 7045238058</li>
                            <li>+91 9136063193</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-xs text-blue-500">Location</h4>
                        <p className={`font-bold ${theme === 'dark' ? 'text-white/70' : 'text-blue-950/70'}`}>
                            <br />Mumbai, Maharashtra, India
                        </p>
                    </div>
                </div>
            </div>

            <div className={`max-w-7xl mx-auto mt-32 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'border-white/5 text-white/20' : 'border-blue-950/5 text-blue-950/20'
                }`}>
                <span>© 2026 RAYFLECT STUDIO. ALL RIGHTS RESERVED.</span>
                <div className="flex gap-12">
                    <button onClick={() => openLegal('privacy')} className="hover:text-blue-500 transition-colors">Privacy</button>
                    <button onClick={() => openLegal('terms')} className="hover:text-blue-500 transition-colors">Terms</button>
                </div>
            </div>

            <LegalModal
                isOpen={legalOpen}
                onClose={() => setLegalOpen(false)}
                title={legalType === 'privacy' ? 'Privacy Protocol' : 'Terms of Service'}
                type={legalType}
                theme={theme}
            />
        </footer>
    );
};
