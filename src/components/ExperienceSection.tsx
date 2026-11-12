import { motion } from 'motion/react';
import { Briefcase, Code, Lightbulb, Rocket } from 'lucide-react';
import workspaceImg from '../assets/images/about_workspace_visual_1794400634027.jpg';
import { ImageWithFallback } from './ImageWithFallback';

const ATTRIBUTES = [
  {
    title: 'Enthusiasm for Learning',
    description:
      'Dedicated to mastering Computer Science and Artificial Intelligence fundamentals step by step.',
    icon: Rocket,
  },
  {
    title: 'Technical Development',
    description:
      'Practicing Python programming alongside clean HTML and CSS web interface craftsmanship.',
    icon: Code,
  },
  {
    title: 'Creativity & Problem-Solving',
    description:
      'Approaching challenges with curiosity, structured thinking, and a drive to build practical digital solutions.',
    icon: Lightbulb,
  },
] as const;

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sky-400">Experience</p>
          <h2
            id="experience-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Fresher – Aspiring AI &amp; Technology Professional
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Focused on building strong engineering habits, hands-on coding fluency, and collaborative problem-solving readiness.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left: Workspace visual */}
          <div className="lg:col-span-5">
            <div className="glass-panel relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/10">
              <ImageWithFallback
                src={workspaceImg}
                alt="Dark modern developer workspace representing continuous learning and technical development"
                fallbackTitle="Technical Development"
                fallbackIcon={<Briefcase className="h-12 w-12" />}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#05070e]/90 via-[#05070e]/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-base font-semibold text-white">
                  Ready to Learn &amp; Contribute
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Python <span aria-hidden="true">·</span> Web Development <span aria-hidden="true">·</span> Artificial Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Right: 3 Structured Strengths */}
          <div className="glass-panel flex flex-col justify-center divide-y divide-white/10 rounded-2xl border border-white/10 p-6 sm:p-8 lg:col-span-7">
            {ATTRIBUTES.map((attr) => {
              const Icon = attr.icon;
              return (
                <div key={attr.title} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-500/10 text-sky-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {attr.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      {attr.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
