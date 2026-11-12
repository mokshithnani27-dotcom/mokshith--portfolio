import { ArrowUp, Github, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onReplayIntro?: () => void;
}

export function Footer({ onReplayIntro }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05070e]/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold text-white">
            Designed &amp; Built by MOKSHITH
          </p>
          <p className="mt-1 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} MOKSHITH. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:mokshithnani36@gmail.com"
            aria-label="Email Mokshith"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
          >
            <Mail className="h-4 w-4 text-sky-400" />
            <span>Email</span>
          </a>

          <a
            href="https://github.com/mokshith-source/mokshith"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mokshith on GitHub"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-violet-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
          >
            <Github className="h-4 w-4 text-violet-400" />
            <span>GitHub</span>
          </a>

          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              aria-label="Replay intro animation"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>Replay Intro</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 transition-all duration-150 hover:border-sky-400/60 hover:bg-sky-500/20 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
