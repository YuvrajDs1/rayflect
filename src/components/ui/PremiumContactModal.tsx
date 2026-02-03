import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Sparkles } from 'lucide-react';
import { Theme } from '../../types';
import { supabase } from '../../lib/supabase';

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: Theme;
}

export const PremiumContactModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, theme }) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Premium Web Design',
        message: ''
    });

    // Handle mounting/unmounting for animations
    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            // Small delay to allow mount then animate in
            const timer = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
            // Wait for animation to finish before unmounting
            const timer = setTimeout(() => setMounted(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('inquiries')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        service: formData.service,
                        message: formData.message,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (!error) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    onClose();
                    setFormData({ name: '', email: '', service: 'Premium Web Design', message: '' });
                }, 2500);
            } else {
                console.error('Error submitting form:', error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isDark = theme === 'dark';

    return createPortal(
        <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Backdrop with heavy blur */}
            <div
                className="absolute inset-0 bg-[#000814]/90 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Main Modal Container */}
            <div
                className={`relative w-full max-w-2xl overflow-hidden rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} ${isDark
                        ? 'bg-[#030d21] border-white/10 shadow-[0_0_100px_-20px_rgba(0,100,255,0.3)]'
                        : 'bg-white border-blue-100 shadow-2xl'
                    }`}
            >
                {/* Decorative Gloss Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {submitted ? (
                    <div className="min-h-[500px] flex flex-col items-center justify-center text-center p-12">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse" />
                            <Sparkles className="relative w-16 h-16 text-blue-500" />
                        </div>
                        <h2 className={`text-4xl font-black uppercase tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-blue-950'}`}>
                            Transmission<br />received
                        </h2>
                        <p className={`text-sm tracking-widest uppercase opacity-60 ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                            We will reflect back shortly
                        </p>
                    </div>
                ) : (
                    <div className="relative p-8 md:p-12">

                        {/* Header */}
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-2 ${isDark ? 'text-white' : 'text-blue-950'}`}>
                                    Initiate<br />
                                    <span className="text-blue-600">Protocol</span>
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-full transition-colors ${isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-blue-900/40 hover:text-blue-900 hover:bg-blue-50'}`}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group space-y-2">
                                    <label className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-blue-300/50 group-focus-within:text-blue-400' : 'text-blue-900/40 group-focus-within:text-blue-600'}`}>
                                        Identification
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="YOUR NAME"
                                        className={`w-full bg-transparent border-b py-2 text-lg font-medium outline-none transition-all placeholder:opacity-20 ${isDark
                                                ? 'text-white border-white/10 focus:border-blue-500 placeholder:text-white'
                                                : 'text-blue-950 border-blue-900/10 focus:border-blue-600 placeholder:text-blue-900'
                                            }`}
                                    />
                                </div>

                                <div className="group space-y-2">
                                    <label className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-blue-300/50 group-focus-within:text-blue-400' : 'text-blue-900/40 group-focus-within:text-blue-600'}`}>
                                        Coordinates
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="EMAIL ADDRESS"
                                        className={`w-full bg-transparent border-b py-2 text-lg font-medium outline-none transition-all placeholder:opacity-20 ${isDark
                                                ? 'text-white border-white/10 focus:border-blue-500 placeholder:text-white'
                                                : 'text-blue-950 border-blue-900/10 focus:border-blue-600 placeholder:text-blue-900'
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-blue-300/50 group-focus-within:text-blue-400' : 'text-blue-900/40 group-focus-within:text-blue-600'}`}>
                                    Trajectory
                                </label>
                                <div className="relative">
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className={`w-full bg-transparent border-b py-2 text-lg font-medium outline-none appearance-none transition-all cursor-pointer ${isDark
                                                ? 'text-white border-white/10 focus:border-blue-500' // options styling handled by browser mostly, but bg needed for dropdown
                                                : 'text-blue-950 border-blue-900/10 focus:border-blue-600'
                                            }`}
                                    >
                                        <option className="bg-[#0b1221]" value="Premium Web Design">Premium Web Design</option>
                                        <option className="bg-[#0b1221]" value="Visual Identity">Visual Identity</option>
                                        <option className="bg-[#0b1221]" value="Digital Strategy">Digital Strategy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-blue-300/50 group-focus-within:text-blue-400' : 'text-blue-900/40 group-focus-within:text-blue-600'}`}>
                                    Vision
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={2}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="BRIEF DESCRIPTION"
                                    className={`w-full bg-transparent border-b py-2 text-lg font-medium outline-none transition-all resize-none placeholder:opacity-20 ${isDark
                                            ? 'text-white border-white/10 focus:border-blue-500 placeholder:text-white'
                                            : 'text-blue-950 border-blue-900/10 focus:border-blue-600 placeholder:text-blue-900'
                                        }`}
                                />
                            </div>

                            <button
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-full bg-blue-600 p-6 transition-all hover:bg-blue-500 active:scale-[0.99]"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-white">
                                    <span>Launch Query</span>
                                    <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                                {/* Shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </button>

                        </form>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};
