import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const PROFILE_IMAGE_URL = '/assets/aistudio/Studio_Portrait_of_a_Young_Man_f85ed809.png';
const TARGET_NAME = 'MOKSHITH';
const GLYPHS = '01X_#*<>~+=$%&!?[]{}ABCDEF';

interface IntroAnimationProps {
  onComplete: () => void;
}

interface WarpParticle {
  x: number;
  y: number;
  z: number;
  pz: number;
  color: string;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [decodedName, setDecodedName] = useState('        ');
  const [bootLog, setBootLog] = useState('INITIALIZING NEURAL LINK');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesized Web Audio API sound effects (Zero external assets required)
  const playSynthTone = (freq: number, type: OscillatorType = 'sine', duration = 0.12, gainLevel = 0.04) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay gracefully suppressed if not yet engaged by user
    }
  };

  // Toggle synthesized audio
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playSynthTone(580, 'triangle', 0.15, 0.08);
    }
  };

  // Full-screen Hyperspace / Neural Canvas Warp
  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = width < 768 ? 85 : 160;
    const particles: WarpParticle[] = Array.from({ length: numParticles }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: Math.random() * width,
      color: Math.random() > 0.45 ? '#38bdf8' : '#a855f7',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(5, 7, 14, 0.32)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z -= 6.5; // Warp speed

        if (p.z <= 0) {
          p.z = width;
          p.pz = width;
          p.x = (Math.random() - 0.5) * width * 2;
          p.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 180 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const prevK = 180 / p.pz;
          const prevX = p.x * prevK + cx;
          const prevY = p.y * prevK + cy;

          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.min(2.5, (1 - p.z / width) * 2.4);
          ctx.stroke();

          p.pz = p.z;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldReduceMotion]);

  // Main Progression & Matrix Text Decryption Loop
  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const startTime = performance.now();
    const duration = 2800; // 2.8s cinematic intro duration

    const logs = [
      { at: 0, text: 'INITIALIZING NEURAL LINK v2.4...' },
      { at: 24, text: 'AUTHENTICATING BIOMETRIC SIGNATURE...' },
      { at: 50, text: 'DECRYPTING IDENTITY: MOKSHITH...' },
      { at: 75, text: 'JOY UNIVERSITY // AI PROTOCOLS ONLINE' },
      { at: 92, text: 'NEURAL CORE SYNCHRONIZED · ACCESS GRANTED' },
    ];

    let lastBeep = 0;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      // Update telemetry log
      const activeLog = [...logs].reverse().find((l) => pct >= l.at);
      if (activeLog) {
        setBootLog(activeLog.text);
      }

      // Matrix text scramble decoding
      const charsLocked = Math.floor((pct / 100) * (TARGET_NAME.length + 3));
      let currentStr = '';
      for (let i = 0; i < TARGET_NAME.length; i++) {
        if (i < charsLocked) {
          currentStr += TARGET_NAME[i];
        } else {
          currentStr += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDecodedName(currentStr);

      // Play soft tech chirps on progress intervals
      if (soundEnabled && pct - lastBeep >= 12 && pct < 90) {
        lastBeep = pct;
        playSynthTone(700 + pct * 6, 'sine', 0.04, 0.03);
      }

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        if (soundEnabled) {
          playSynthTone(880, 'sine', 0.35, 0.06);
        }
        setTimeout(onComplete, 480);
      }
    };

    const animId = requestAnimationFrame(frame);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [onComplete, shouldReduceMotion, soundEnabled]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 18;
    const normY = (e.clientY / window.innerHeight - 0.5) * 18;
    setMouseOffset({ x: normX, y: normY });
  };

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(10px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      }}
      onPointerMove={handlePointerMove}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#05070e] text-white select-none cursor-default"
    >
      {/* Dynamic 2.5D Hyperspace Warp Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
      />

      {/* Radial Depth Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 20%, rgba(5,7,14,0.7) 65%, #05070e 100%)',
        }}
      />

      {/* Top Utility Bar: Sound FX Toggle + Skip Button */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between p-6 sm:px-10">
        {/* Audio Synthesizer Toggle */}
        <button
          type="button"
          onClick={handleToggleSound}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable synthesized sound effects'}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#070b17]/85 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-300 backdrop-blur-md transition-all duration-150 hover:border-sky-400/40 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="h-3.5 w-3.5 text-sky-400" />
              <span>SFX: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-slate-400" />
              <span>SFX: OFF</span>
            </>
          )}
        </button>

        {/* Skip Button with progress ring indicator */}
        <button
          type="button"
          onClick={onComplete}
          aria-label="Skip intro animation"
          className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-[#070b17]/85 px-4 py-1.5 text-xs font-mono font-semibold text-slate-300 backdrop-blur-md transition-all duration-150 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <span>ESC TO SKIP</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        </button>
      </header>

      {/* Center 3D Holographic Assembly */}
      <div
        className="relative z-20 flex flex-col items-center px-4"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Holographic Aperture Portal Framing the Portrait */}
        <div className="relative flex items-center justify-center p-6 sm:p-8">
          {/* Luminous Pulsing Quantum Core Glow */}
          <div
            aria-hidden="true"
            className="animate-aura-breathe absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/55 via-blue-600/35 to-violet-500/55 blur-3xl"
          />

          {/* Outer Rotating Coordinate Dial Ring with Compass Ticks */}
          <div
            aria-hidden="true"
            className="animate-orbit-reverse absolute inset-0 rounded-full border border-dashed border-sky-400/40"
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-sky-400">
              000°
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-violet-400">
              180°
            </span>
            <span className="absolute top-1/2 -left-3 -translate-y-1/2 font-mono text-[9px] font-bold text-sky-400">
              270°
            </span>
            <span className="absolute top-1/2 -right-3 -translate-y-1/2 font-mono text-[9px] font-bold text-violet-400">
              090°
            </span>
          </div>

          {/* Multi-Spectrum Sweeping Conic Light Ring */}
          <div
            aria-hidden="true"
            className="animate-orbit-slow absolute inset-2.5 rounded-full p-[2px]"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(56,189,248,1) 0deg, rgba(139,92,246,1) 90deg, transparent 160deg, rgba(59,130,246,0.9) 250deg, transparent 310deg, rgba(56,189,248,1) 360deg)',
            }}
          >
            <div className="h-full w-full rounded-full bg-[#05070e]" />
          </div>

          {/* High-Tech Circular Photo Container with Live Laser Sweep */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-sky-400/60 bg-[#090e1c] p-1 shadow-[0_0_60px_-8px_rgba(56,189,248,0.7)] sm:h-44 sm:w-44"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#05070e]">
              <ImageWithFallback
                src={PROFILE_IMAGE_URL}
                alt="Mokshith - B.Tech CSE (AI) Joy University"
                fallbackTitle="MOKSHITH"
                priority
                className="h-full w-full object-cover object-top"
              />

              {/* Holographic Cyan-to-Purple Color Dodge Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-transparent to-violet-500/20 mix-blend-screen"
              />

              {/* Single Sweeping Biometric Recognition Laser Line */}
              <motion.div
                initial={{ top: '-15%' }}
                animate={{ top: '115%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_12px_#38bdf8]"
              />

              {/* Inner Optical Vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(5,7,14,0.55)] ring-1 ring-inset ring-sky-300/40"
              />
            </div>
          </motion.div>
        </div>

        {/* Matrix Scramble Decoded Hero Name: M O K S H I T H */}
        <div className="mt-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-[11px] font-mono font-semibold tracking-wider text-sky-300 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI &amp; TECHNOLOGY PROFESSIONAL</span>
          </motion.div>

          <h1 className="mt-3 font-display text-4xl font-black tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-violet-200 sm:text-6xl sm:tracking-[0.28em] lg:text-7xl">
            {decodedName}
          </h1>

          <p className="mt-2 text-xs font-mono tracking-widest text-slate-400 sm:text-sm">
            JOY UNIVERSITY <span aria-hidden="true" className="text-sky-400">·</span> B.TECH COMPUTER SCIENCE &amp; ARTIFICIAL INTELLIGENCE
          </p>
        </div>

        {/* Futuristic System Telemetry Loader */}
        <div className="mt-8 w-72 max-w-sm sm:w-80">
          <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
            <span className="truncate pr-2 text-sky-400 font-medium">
              &gt; {bootLog}
            </span>
            <span className="tabular-nums font-bold text-white shrink-0">
              {progress}%
            </span>
          </div>

          {/* Precision Neon Gauge Bar */}
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 shadow-[0_0_14px_rgba(56,189,248,0.85)] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Corner Subtle Cyber Telemetry */}
      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between p-6 text-[10px] font-mono text-slate-400 sm:px-10">
        <div>
          <span>AUTH_ID: </span>
          <span className="text-sky-400">MOKSHITH_CORE</span>
        </div>
        <div>
          <span>NODE: </span>
          <span className="text-violet-400">JOY_UNIV_AI_LABS</span>
        </div>
      </footer>
    </motion.div>
  );
}
