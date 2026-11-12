import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const PROFILE_IMAGE_URL = '/assets/aistudio/Studio_Portrait_of_a_Young_Man_f85ed809.png';

const MINDSET_PILLARS = [
  {
    title: 'Continuous Learning',
    detail: 'Exploring emerging technologies and sharpening technical foundations every day.',
  },
  {
    title: 'Problem Solving',
    detail: 'Turning practical ideas into structured, reliable software solutions.',
  },
  {
    title: 'Creativity & Innovation',
    detail: 'Combining analytical logic with thoughtful digital design.',
  },
  {
    title: 'Personal Growth',
    detail: 'Dedicated to building impactful projects and meaningful digital experiences.',
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12"
      >
        {/* Left Column: Framed Profile Image */}
        <div className="lg:col-span-5">
          <div className="glass-panel group relative h-full min-h-[340px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_-24px_rgba(56,189,248,0.25)] transition-all duration-300 hover:border-sky-400/40 hover:shadow-[0_28px_70px_-20px_rgba(139,92,246,0.35)]">
            <ImageWithFallback
              src={PROFILE_IMAGE_URL}
              alt="Mokshith studio profile image"
              fallbackTitle="MOKSHITH"
              fallbackIcon={<User className="h-12 w-12" />}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#05070e]/95 via-[#05070e]/45 to-transparent transition-opacity duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
              <p className="font-display text-lg font-semibold text-white">
                MOKSHITH
              </p>
              <p className="mt-1 text-sm text-slate-300">
                B.Tech CSE (Artificial Intelligence) <span aria-hidden="true">·</span> JOY UNIVERSITY
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Biography & Core Pillars */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-sm font-medium text-sky-400">About Me</p>
          <h2
            id="about-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Driven by curiosity, creativity, and engineering growth
          </h2>

          <p className="mt-6 max-w-[68ch] text-base leading-[1.75] text-slate-300">
            I&apos;m Mokshith, a passionate and ambitious individual with a strong interest in
            technology, creativity, and innovation. I enjoy exploring new technologies, learning new
            skills, and turning ideas into practical solutions. I am a motivated and dedicated
            individual who believes in continuous learning, problem-solving, and personal growth.
            My goal is to build impactful projects, enhance my technical expertise, and create
            meaningful digital experiences.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2">
            {MINDSET_PILLARS.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="font-display text-base font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
