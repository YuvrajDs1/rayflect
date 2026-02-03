import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { Theme } from '../../types';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: 'privacy' | 'terms';
    theme: Theme;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, type, theme }) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            const timer = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
            const timer = setTimeout(() => setMounted(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return createPortal(
        <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#000814]/90 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Main Container */}
            <div
                className={`relative w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} ${isDark
                        ? 'bg-[#030d21] border-white/10 shadow-[0_0_100px_-20px_rgba(0,100,255,0.3)]'
                        : 'bg-white border-blue-100 shadow-2xl'
                    }`}
            >
                {/* Header */}
                <div className={`p-8 md:p-10 border-b flex justify-between items-center ${isDark ? 'border-white/5' : 'border-blue-900/5'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                            {type === 'privacy' ? <ShieldCheck size={24} /> : <FileText size={24} />}
                        </div>
                        <div>
                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-blue-500' : 'text-blue-500'}`}>Legal</p>
                            <h2 className={`text-2xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-blue-950'}`}>{title}</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors ${isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-blue-900/40 hover:text-blue-900 hover:bg-blue-50'}`}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Scrollable Area */}
                <div className={`flex-1 overflow-y-auto p-8 md:p-12 space-y-8 custom-scrollbar`}>
                    {type === 'privacy' ? (
                        <>
                            <Section title="1. Protocol Initiation" isDark={isDark}>
                                At Rayflect, we prioritize the sanctity of your digital footprint. This privacy protocol outlines how we encrypt, process, and reflect your data within our ecosystem. Your identity remains paramount.
                            </Section>
                            <Section title="2. Data Trajectory" isDark={isDark}>
                                Information collected (Identity, Frequency, Vision) is used solely to calibrate our design vectors to your brand's specific needs. We do not broadcast your signals to third-party entities without explicit authorization.
                            </Section>
                            <Section title="3. Encryption Standards" isDark={isDark}>
                                All transmissions are secured via quantum-resistant encryption layers. Your strategic data is siloed in our secure digital vaults, accessible only to authorized architects of your project.
                            </Section>
                        </>
                    ) : (
                        <>
                            <Section title="1. Engagement Parameters" isDark={isDark}>
                                By initiating a connection with Rayflect, you agree to our standard operating procedures. Just as light reflects perfectly off a polished surface, we expect transparent communication throughout our collaboration.
                            </Section>
                            <Section title="2. Intellectual Velocity" isDark={isDark}>
                                All concepts, designs, and code architectures generated during the preliminary phase remain the intellectual property of Rayflect until specifically transferred upon project completion and final settlement.
                            </Section>
                            <Section title="3. Liability Horizon" isDark={isDark}>
                                While we strive for perfection, the digital landscape is ever-shifting. Rayflect is not liable for external market fluctuations or third-party platform changes that may affect your trajectory post-launch.
                            </Section>
                        </>
                    )}

                    <div className={`p-6 rounded-2xl border ${isDark ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                        <p className={`text-sm ${isDark ? 'text-blue-200/60' : 'text-blue-900/60'}`}>
                            Last Updated: 2026.01.31 // Version 2.0.4-Alpha
                        </p>
                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
};

const Section = ({ title, children, isDark }: { title: string, children: React.ReactNode, isDark: boolean }) => (
    <div className="space-y-3">
        <h3 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-blue-950'}`}>
            {title}
        </h3>
        <p className={`leading-relaxed ${isDark ? 'text-white/60' : 'text-blue-950/60'}`}>
            {children}
        </p>
    </div>
);
