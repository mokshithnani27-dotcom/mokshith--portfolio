import { motion } from 'motion/react';
import { ArrowUpRight, Compass, Layers, Sparkles } from 'lucide-react';
import upcomingPreviewImg from '../assets/images/upcoming_ai_preview_1794400634146.jpg';
import { ImageWithFallback } from './ImageWithFallback';

const UPCOMING_SLOTS = [
  {
    slot: 'Slot 01',
    focus: 'Artificial Intelligence & Python',
    summary: 'Exploring foundational AI workflows and Python problem-solving builds.',
  },
  {
    slot: 'Slot 02',
    focus: 'Modern Web Development',
    summary: 'Designing clean, accessible, user-friendly websites built with semantic HTML and CSS.',
  },
  {
    slot: 'Slot 03',
    focus: 'Responsive Front-End Interfaces',
    summary: 'Crafting dark-mode digital experiences engineered for desktop, tablet, and mobile.',
  },
] as const;

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-sky-400">Portfolio</p>
            <h2
              id="projects-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Upcoming Projects
            </h2>
          </div>

          <a
            href="https://github.com/mokshith-source/mokshith"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-150 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
          >
            <span>Follow Progress on GitHub</span>
            <ArrowUpRight className="h-4 w-4 text-sky-400" />
          </a>
        </div>

        {/* Featured Upcoming Showcase Container */}
        <div className="glass-panel mt-10 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            <div className="relative min-h-[240px] lg:col-span-6 lg:min-h-[300px]">
              <ImageWithFallback
                src={upcomingPreviewImg}
                alt="Futuristic neural glass prism illustration representing upcoming AI and web projects"
                fallbackTitle="Upcoming Projects"
                fallbackIcon={<Layers className="h-12 w-12" />}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070b16]/85 hidden lg:block"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#070b16]/85 via-transparent to-transparent lg:hidden"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-6 lg:p-10">
              <div className="flex items-center gap-2 text-sm font-medium text-violet-300">
                <Compass className="h-4 w-4 text-violet-400" />
                <span>In Active Exploration</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                Building What Comes Next
              </h3>

              <p className="mt-4 text-base leading-relaxed text-slate-200">
                I&apos;m constantly learning and exploring new technologies. Exciting projects are coming soon!
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                As I continue my B.Tech Computer Science Engineering (Artificial Intelligence) studies at JOY UNIVERSITY, new Python, web, and AI builds will be published here and on GitHub.
              </p>
            </div>
          </div>
        </div>

        {/* Modular Placeholder Slots for Future Projects */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {UPCOMING_SLOTS.map((item) => (
            <article
              key={item.slot}
              className="glass-panel flex flex-col justify-between rounded-2xl border border-dashed border-white/15 p-6 transition-colors duration-200 hover:border-sky-400/40"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-sky-400 tabular-nums">{item.slot}</span>
                  <span className="font-medium text-slate-400">Coming Soon</span>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {item.focus}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span>Future project slot ready for updates</span>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
