import React, { useState, useEffect, useRef } from 'react';
import { Theme } from './types';
import { DigitalHorizon } from './components/ui/DigitalHorizon';

// Layouts
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Sections
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { TechStackBanner } from './components/sections/TechStackBanner';
import { Work } from './components/sections/Work';
import { CTA } from './components/sections/CTA';

// UI
import { GlowingCursor } from './components/ui/GlowingCursor';
import { SunlightEffect } from './components/ui/SunlightEffect';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { PremiumContactModal } from './components/ui/PremiumContactModal';
import { ProcessVisual } from './components/ui/ProcessVisual';
import LiquidEther from './components/ui/LiquidEther';

const ETHER_COLORS = ['#0066FF', '#00CCFF', '#80D4FF'];

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [isExpertise, setIsExpertise] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        setIsExpertise(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '-20% 0px -20% 0px' }
    );

    if (servicesRef.current) servicesObserver.observe(servicesRef.current);

    return () => {
      servicesObserver.disconnect();
    };
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-600 selection:text-white transition-colors duration-1000 ${isExpertise ? 'text-blue-950' : (theme === 'dark' ? 'text-white' : 'text-blue-950')
      }`}>


      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <LiquidEther
          colors={ETHER_COLORS}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.2}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="noise-bg" />
      <DigitalHorizon />
      <GlowingCursor />

      {isExpertise && <SunlightEffect />}
      <AnimatedBackground theme={theme} isExpertise={isExpertise} />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenProcess={() => setIsProcessOpen(true)}
        isExpertise={isExpertise}
      />

      <PremiumContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} theme={theme} />

      <ProcessVisual
        isOpen={isProcessOpen}
        onClose={() => setIsProcessOpen(false)}
        onConfirm={() => {
          setIsProcessOpen(false);
          setIsContactOpen(true);
        }}
      />

      <Hero theme={theme} onOpenContact={() => setIsContactOpen(true)} />

      <Services ref={servicesRef} theme={theme} isExpertise={isExpertise} />

      <div className="text-center pb-8 pt-16">
        <h2 className={`text-4xl font-black uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-blue-950'}`}>Tech Used</h2>
      </div>
      <TechStackBanner theme={theme} isExpertise={isExpertise} />

      <Work theme={theme} />

      <CTA theme={theme} onOpenContact={() => setIsContactOpen(true)} />

      <Footer theme={theme} onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
