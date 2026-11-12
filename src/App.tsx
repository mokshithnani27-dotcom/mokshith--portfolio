/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { BackgroundGrid } from './components/BackgroundGrid';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { IntroAnimation } from './components/IntroAnimation';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introSequence, setIntroSequence] = useState(0);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroSequence((prev) => prev + 1);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[#05070e] text-slate-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <BackgroundGrid />
        <Navbar onReplayIntro={handleReplayIntro} />

        <main id="main-content" className="relative z-10">
          <HeroSection key={`hero-stage-${introSequence}`} />
          <MarqueeRibbon />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        <Footer onReplayIntro={handleReplayIntro} />
      </div>
    </MotionConfig>
  );
}
