import { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, FileCode2, Palette } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  role: string;
  description: string;
  focusAreas: string[];
  accent: 'blue' | 'violet';
  icon: typeof Code2;
}

const TECHNICAL_SKILLS: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    role: 'Core Programming Language',
    description:
      'Developing structured Python programs and building algorithmic problem-solving foundations for computer science and artificial intelligence.',
    focusAreas: [
      'Writing clean, readable Python programs',
      'Solving programming problems with logical workflows',
      'Supporting Computer Science & AI coursework at JOY UNIVERSITY',
    ],
    accent: 'blue',
    icon: Code2,
  },
  {
    id: 'html',
    name: 'HTML',
    role: 'Web Structure & Semantics',
    description:
      'Structuring accessible, semantic web pages that serve as the clean foundation for modern websites and interactive user experiences.',
    focusAreas: [
      'Semantic HTML5 document architecture',
      'Accessible landmarks, forms, and headings',
      'SEO-friendly page structure',
    ],
    accent: 'violet',
    icon: FileCode2,
  },
  {
    id: 'css',
    name: 'CSS',
    role: 'Visual Design & Responsiveness',
    description:
      'Crafting attractive website interfaces and responsive layouts that adapt smoothly across desktop, tablet, and mobile viewports.',
    focusAreas: [
      'Responsive grid and flexbox layouts',
      'Clean visual hierarchy and modern UI styling',
      'Smooth hover interactions and subtle transitions',
    ],
    accent: 'blue',
    icon: Palette,
  },
];

export function SkillsSection() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('python');
  const activeSkill =
    TECHNICAL_SKILLS.find((skill) => skill.id === selectedSkillId) ?? TECHNICAL_SKILLS[0];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sky-400">Technical Skills</p>
          <h2
            id="skills-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Core Technologies
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Select a skill card below to view how each technology supports my programming and web development journey.
          </p>
        </div>

        {/* 3 Interactive Skill Cards — Clean labels & icons without invented percentages */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TECHNICAL_SKILLS.map((skill, idx) => {
            const Icon = skill.icon;
            const isSelected = skill.id === activeSkill.id;
            const accentGradient =
              skill.accent === 'blue'
                ? 'from-sky-400 via-blue-500 to-violet-500'
                : 'from-violet-400 via-purple-500 to-sky-400';

            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => setSelectedSkillId(skill.id)}
                aria-pressed={isSelected}
                className={`glass-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer ${
                  isSelected
                    ? 'border-sky-400/55 shadow-[0_0_36px_-10px_rgba(56,189,248,0.45)] -translate-y-0.5'
                    : 'border-white/10 hover:border-sky-400/35 hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                        isSelected
                          ? 'border-sky-400/50 bg-sky-500/15 text-sky-300'
                          : 'border-white/10 bg-white/5 text-slate-300 group-hover:border-sky-400/30 group-hover:text-sky-300'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {skill.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-sky-300/90">
                    {skill.role}
                  </p>
                </div>

                {/* Animated futuristic light beam indicator (non-numeric, no fake %) */}
                <div className="mt-6">
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full w-full rounded-full bg-gradient-to-r ${accentGradient} transition-opacity duration-200 ${
                        isSelected ? 'opacity-100' : 'opacity-45 group-hover:opacity-80'
                      }`}
                    />
                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="animate-beam-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/75 to-transparent"
                      />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Skill Interactive Detail Strip */}
        <div className="glass-panel mt-6 rounded-2xl border border-white/10 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-sky-400">Selected Skill Focus</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">
                {activeSkill.name}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {activeSkill.description}
              </p>
            </div>

            <div className="border-t border-white/10 pt-5 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <ul className="space-y-2.5">
                {activeSkill.focusAreas.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-slate-200"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
