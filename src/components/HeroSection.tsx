import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { LiveProfileAvatar } from './LiveProfileAvatar';

const PROFILE_IMAGE_URL = '/assets/aistudio/Studio_Portrait_of_a_Young_Man_f85ed809.png';

const FOCUS_HIGHLIGHTS = [
  {
    title: 'Python',
    summary: 'Developing clean programs and solving structured programming challenges.',
  },
  {
    title: 'Web Development',
    summary: 'Building functional digital experiences and modern user-friendly websites.',
  },
  {
    title: 'Artificial Intelligence',
    summary: 'Pursuing B.Tech Computer Science Engineering (AI) at JOY UNIVERSITY.',
  },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: 'easeOut',
    },
  },
};

const avatarVariants: Variants = {
  hidden: { opacity: 0, scale: 0.86, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      delay: 0.15,
      ease: 'easeOut',
    },
  },
};

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FOCUS_HIGHLIGHTS.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const scrollToTarget = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeHighlight = FOCUS_HIGHLIGHTS[activeIndex];

  return (
    <section
      id="top"
      className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36 lg:pb-20"
    >
      {/* Cinematic Post-Intro Atmospheric Flash / Horizon Burst */}
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="animate-horizon-flash pointer-events-none absolute -top-10 left-1/2 -z-10 h-64 w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500/30 via-blue-500/40 to-violet-500/30 blur-3xl"
        />
      )}

      <motion.div
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        animate="visible"
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10"
      >
        {/* Left Column: Typography Hierarchy & CTAs with Pro-Level Kinetic Reveal */}
        <div className="lg:col-span-7">
          {/* University & Degree Badge */}
          <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-sky-300 shadow-[0_0_16px_-3px_rgba(56,189,248,0.35)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
              </span>
              <span>B.Tech CSE (Artificial Intelligence)</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">JOY UNIVERSITY</span>
            </div>
          </motion.div>

          {/* Large Heading with Electric Shimmer: Hi, I'm MOKSHITH */}
          <motion.h1
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            Hi, I&apos;m{' '}
            <span className="animate-text-shimmer bg-gradient-to-r from-sky-300 via-white to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
              MOKSHITH
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="mt-4 font-display text-xl font-semibold text-slate-200 sm:text-2xl"
          >
            Aspiring AI &amp; Technology Professional
          </motion.p>

          {/* Animated Highlight Strip for Python, Web Development, Artificial Intelligence */}
          <motion.div
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="mt-6 border-y border-white/10 py-3.5"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="text-slate-400">Focused on</span>
              <div
                className="flex flex-wrap items-center gap-3"
                role="tablist"
                aria-label="Core focus highlights"
              >
                {FOCUS_HIGHLIGHTS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative py-0.5 font-display text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'text-sky-300'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {item.title}
                      {isActive && (
                        <motion.span
                          layoutId="hero-focus-underline"
                          className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 min-h-[1.5rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeHighlight.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm text-slate-300"
                >
                  {activeHighlight.summary}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[1.0625rem]"
          >
            Passionate about technology, programming, creativity, and building innovative digital experiences.
          </motion.p>

          {/* Two Hero CTA Buttons */}
          <motion.div
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => scrollToTarget(e, 'projects')}
              className="group relative inline-flex min-h-[44px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-4px_rgba(56,189,248,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-2px_rgba(139,92,246,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToTarget(e, 'contact')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
            >
              <Mail className="h-4 w-4 text-sky-400" />
              <span>Contact Me</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Live Holographic Animated AI Profile Avatar with Entrance Shockwave */}
        <motion.div
          variants={shouldReduceMotion ? undefined : avatarVariants}
          className="relative flex justify-center lg:col-span-5 lg:justify-end"
        >
          {/* Post-Intro Concentric Quantum Shockwave Burst Rings */}
          {!shouldReduceMotion && (
            <>
              <div
                aria-hidden="true"
                className="animate-entrance-shockwave pointer-events-none absolute inset-0 m-auto h-48 w-48 rounded-full border-2 border-sky-400/80 shadow-[0_0_40px_rgba(56,189,248,0.7)]"
              />
              <div
                aria-hidden="true"
                className="animate-entrance-shockwave-2 pointer-events-none absolute inset-0 m-auto h-48 w-48 rounded-full border border-violet-400/70 shadow-[0_0_35px_rgba(139,92,246,0.6)]"
              />
            </>
          )}

          <LiveProfileAvatar imageSrc={PROFILE_IMAGE_URL} name="MOKSHITH" />
        </motion.div>
      </motion.div>

      {/* Full-Width Core Pillars Strip Below Hero Split */}
      <motion.div
        variants={shouldReduceMotion ? undefined : itemVariants}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 glass-panel grid grid-cols-1 divide-y divide-white/10 rounded-2xl border border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        <div className="group px-6 py-5 transition-colors duration-200 hover:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-sky-400 tabular-nums">01</span>
            <Sparkles className="h-3.5 w-3.5 text-sky-400/50 transition-colors group-hover:text-sky-300" />
          </div>
          <p className="mt-1 font-display text-base font-semibold text-white">
            Artificial Intelligence
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Computer Science Engineering specialization at JOY UNIVERSITY
          </p>
        </div>

        <div className="group px-6 py-5 transition-colors duration-200 hover:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-sky-400 tabular-nums">02</span>
            <Sparkles className="h-3.5 w-3.5 text-sky-400/50 transition-colors group-hover:text-sky-300" />
          </div>
          <p className="mt-1 font-display text-base font-semibold text-white">
            Web Development
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Creating responsive, accessible, and user-friendly digital interfaces
          </p>
        </div>

        <div className="group px-6 py-5 transition-colors duration-200 hover:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-violet-400 tabular-nums">03</span>
            <Sparkles className="h-3.5 w-3.5 text-violet-400/50 transition-colors group-hover:text-violet-300" />
          </div>
          <p className="mt-1 font-display text-base font-semibold text-white">
            Python Programming
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Writing structured programs and solving logical engineering problems
          </p>
        </div>
      </motion.div>
    </section>
  );
}
