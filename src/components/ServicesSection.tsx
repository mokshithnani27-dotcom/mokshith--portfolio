import { motion } from 'motion/react';
import { Globe, Layout, Terminal } from 'lucide-react';

const SERVICES = [
  {
    number: '01',
    title: 'Web Development',
    points: [
      'Creating modern and user-friendly websites.',
      'Building functional digital experiences.',
    ],
    icon: Globe,
    glowColor: 'hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.45)]',
  },
  {
    number: '02',
    title: 'Front-End Development',
    points: [
      'Designing attractive website interfaces.',
      'Creating responsive layouts.',
    ],
    icon: Layout,
    glowColor: 'hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.45)]',
  },
  {
    number: '03',
    title: 'Python Programming',
    points: [
      'Developing Python programs.',
      'Solving programming problems.',
    ],
    icon: Terminal,
    glowColor: 'hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.45)]',
  },
] as const;

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sky-400">Services</p>
          <h2
            id="services-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            What I Focus On Building
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Applying foundational skills in web technologies and Python programming to craft clean digital experiences.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`glass-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-sky-400/50 sm:p-7 ${service.glowColor}`}
              >
                {/* Top subtle gradient edge accent on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-400/25 bg-gradient-to-br from-sky-500/15 to-violet-500/15 text-sky-300 transition-transform duration-200 group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-white">
                    {service.title}
                  </h3>

                  <ul className="mt-4 space-y-2.5 border-t border-white/10 pt-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/80"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
