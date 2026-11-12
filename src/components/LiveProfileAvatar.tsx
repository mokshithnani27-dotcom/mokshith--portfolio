import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, User } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface LiveProfileAvatarProps {
  imageSrc: string;
  name: string;
}

export function LiveProfileAvatar({ imageSrc, name }: LiveProfileAvatarProps) {
  const [pulseCount, setPulseCount] = useState(0);

  const handleTriggerPulse = () => {
    setPulseCount((prev) => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Main Interactive Animated Circle Frame */}
      <div
        onClick={handleTriggerPulse}
        role="button"
        tabIndex={0}
        aria-label="Interactive live animated profile. Click to trigger energy sonar pulse."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTriggerPulse();
          }
        }}
        className="group relative flex h-72 w-72 cursor-pointer items-center justify-center select-none sm:h-84 sm:w-84 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
      >
        {/* Soft neon radial backdrop glow */}
        <div
          aria-hidden="true"
          className="animate-aura-breathe absolute inset-3 rounded-full bg-gradient-to-tr from-sky-500/40 via-blue-600/30 to-violet-500/45 blur-2xl transition-all duration-300 group-hover:from-sky-400/50 group-hover:to-violet-400/50"
        />

        {/* Outer counter-rotating dashed telemetry ring with compass tick marks */}
        <div
          aria-hidden="true"
          className="animate-orbit-reverse pointer-events-none absolute inset-0 rounded-full border border-dashed border-sky-400/35 transition-colors duration-300 group-hover:border-violet-400/60"
        >
          {/* North, East, South, West telemetry indicators */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 font-mono text-[9px] text-sky-400 font-semibold">
            N
          </span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 font-mono text-[9px] text-violet-400 font-semibold">
            S
          </span>
          <span className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 font-mono text-[9px] text-sky-400 font-semibold">
            W
          </span>
          <span className="absolute right-0 top-1/2 translate-x-1.5 -translate-y-1/2 font-mono text-[9px] text-violet-400 font-semibold">
            E
          </span>
        </div>

        {/* Primary sweeping conic-gradient orbital ring */}
        <div
          aria-hidden="true"
          className="animate-orbit-slow pointer-events-none absolute inset-2.5 rounded-full p-[2px] opacity-95 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(56,189,248,0.95) 0deg, rgba(139,92,246,0.95) 85deg, transparent 155deg, rgba(59,130,246,0.8) 225deg, transparent 305deg, rgba(56,189,248,0.95) 360deg)',
          }}
        >
          <div className="h-full w-full rounded-full bg-[#05070e]" />
        </div>

        {/* Central Portrait Container */}
        <div className="relative h-60 w-60 overflow-hidden rounded-full border-2 border-sky-400/50 bg-[#090e1c] p-1 shadow-[0_0_55px_-8px_rgba(56,189,248,0.5)] transition-all duration-300 group-hover:border-sky-300/80 group-hover:shadow-[0_0_70px_-6px_rgba(139,92,246,0.7)] sm:h-70 sm:w-70">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#05070e]">
            {/* Real Base Photo in Photo Mode */}
            <ImageWithFallback
              src={imageSrc}
              alt={`Live interactive portrait of ${name}`}
              fallbackTitle={name}
              fallbackIcon={<User className="h-12 w-12" />}
              priority
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />

            {/* Click sonar energy ripple animation */}
            {pulseCount > 0 && (
              <motion.div
                key={pulseCount}
                initial={{ scale: 0.1, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 m-auto h-32 w-32 rounded-full border-2 border-sky-300 shadow-[0_0_30px_#38bdf8]"
              />
            )}

            {/* High-tech glass dark vignette & edge ring */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_28px_rgba(5,7,14,0.45)] ring-1 ring-inset ring-sky-300/35"
            />
          </div>
        </div>
      </div>

      {/* Photo Mode indicator under the profile */}
      <div className="mt-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#070b17]/90 px-3.5 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-sm">
        <Eye className="h-3.5 w-3.5 text-sky-400" />
        <span>Photo Mode</span>
      </div>

      <p className="mt-2 text-[11px] text-slate-400">
        Click or hover portrait to trigger interactive energy pulse
      </p>
    </div>
  );
}
