import { motion } from 'motion/react';
import { Cpu, GraduationCap } from 'lucide-react';

export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sky-400">Education</p>
          <h2
            id="education-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Academic Foundation
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Pursuing undergraduate engineering studies focused on artificial intelligence and modern computing systems.
          </p>
        </div>

        {/* Futuristic Timeline Node + Glassmorphism Education Card */}
        <div className="relative mt-10 pl-8 sm:pl-12">
          {/* Vertical glowing timeline rail */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-3 w-px bg-gradient-to-b from-sky-400 via-violet-500/70 to-transparent sm:left-4"
          />

          {/* Timeline node marker */}
          <div
            aria-hidden="true"
            className="absolute top-8 left-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-sky-300 bg-[#05070e] shadow-[0_0_16px_rgba(56,189,248,0.8)] sm:left-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          </div>

          <article className="glass-panel group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-200 hover:border-sky-400/40 hover:shadow-[0_0_40px_-14px_rgba(56,189,248,0.35)] sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/10 text-sky-300">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-sky-300">University</p>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                      JOY UNIVERSITY
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Degree</p>
                    <p className="mt-1 font-display text-lg font-semibold text-slate-100">
                      Bachelor of Technology (B.Tech)
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">Department</p>
                    <p className="mt-1 font-display text-lg font-semibold text-slate-100">
                      Computer Science Engineering (Artificial Intelligence)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-sm font-medium text-violet-300 md:pt-1">
                <Cpu className="h-4 w-4 text-violet-400 shrink-0" />
                <span className="whitespace-nowrap">AI Specialization</span>
              </div>
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  );
}
