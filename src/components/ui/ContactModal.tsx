import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { Theme } from '../../types';
import { supabase } from '../../lib/supabase';

export const ContactModal = ({ isOpen, onClose, theme }: { isOpen: boolean, onClose: () => void, theme: Theme }) => {
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Premium Web Design',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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
                console.log('✅ Inquiry saved to Supabase');
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    onClose();
                    setFormData({ name: '', email: '', service: 'Premium Web Design', message: '' });
                }, 2500);
            } else {
                console.error('Failed to save inquiry:', error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"
                onClick={onClose}
            />
            <div className={`relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border p-8 md:p-12 shadow-2xl transition-all duration-500 ease-out ${theme === 'dark' ? 'bg-[#001233] border-white/10 text-white' : 'bg-white border-blue-100 text-blue-950'
                }`}>
                {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="mb-6 rounded-full bg-blue-500/20 p-6">
                            <CheckCircle2 className="h-16 w-16 text-blue-500" />
                        </div>
                        <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter">Received.</h2>
                        <p className="max-w-xs text-lg opacity-60">We'll reflect back to you within 24 hours.</p>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={onClose}
                            className="absolute right-8 top-8 opacity-40 hover:opacity-100 transition-opacity"
                        >
                            <X size={32} />
                        </button>
                        <div className="mb-10 text-center">
                            <h2 className="mb-2 text-4xl font-black uppercase tracking-tighter">Initiate</h2>
                            <p className="text-blue-500 text-xs font-black uppercase tracking-[0.3em]">Project Briefing</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Identity</label>
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Full Name"
                                        className={`w-full rounded-2xl border bg-transparent px-5 py-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 ${theme === 'dark' ? 'border-white/10' : 'border-blue-900/10'
                                            }`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Frequency</label>
                                    <input
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Email Address"
                                        className={`w-full rounded-2xl border bg-transparent px-5 py-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 ${theme === 'dark' ? 'border-white/10' : 'border-blue-900/10'
                                            }`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Trajectory</label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className={`w-full rounded-2xl border bg-transparent px-5 py-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 appearance-none ${theme === 'dark' ? 'border-white/10' : 'border-blue-900/10'
                                        }`}
                                >
                                    <option className={theme === 'dark' ? "bg-[#001233]" : "bg-white"} value="Premium Web Design">Premium Web Design</option>
                                    <option className={theme === 'dark' ? "bg-[#001233]" : "bg-white"} value="Visual Identity">Visual Identity</option>
                                    <option className={theme === 'dark' ? "bg-[#001233]" : "bg-white"} value="Digital Strategy">Digital Strategy</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Vision</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell us about your brand goals..."
                                    className={`w-full resize-none rounded-2xl border bg-transparent px-5 py-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 ${theme === 'dark' ? 'border-white/10' : 'border-blue-900/10'
                                        }`}
                                />
                            </div>
                            <button
                                type="submit"
                                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-blue-500 active:scale-95"
                            >
                                Launch Query
                                <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};
