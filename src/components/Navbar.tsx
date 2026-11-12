import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
] as const;

interface NavbarProps {
  onReplayIntro?: () => void;
}

export function Navbar({ onReplayIntro }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const scrollMarker = window.scrollY + 140;
      let current = '';
      for (const item of [...NAV_ITEMS, { id: 'contact', label: 'Contact' }]) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollMarker) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#05070e]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="font-display text-base font-bold tracking-tight text-white transition-colors duration-150 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 sm:text-lg"
        >
          MOKSHITH
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`group relative py-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-sky-400 to-violet-500 transition-transform duration-200 ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden items-center justify-center rounded-lg border border-sky-400/40 bg-gradient-to-r from-sky-500/20 to-violet-500/20 px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_-4px_rgba(56,189,248,0.45)] transition-all duration-150 hover:border-sky-300/70 hover:from-sky-500/30 hover:to-violet-500/30 hover:shadow-[0_0_26px_-2px_rgba(139,92,246,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 md:inline-flex"
          >
            Contact Me
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-colors hover:border-sky-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#070b17]/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-sky-500/10 text-sky-300'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            {onReplayIntro && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span>Replay Intro</span>
              </button>
            )}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-4px_rgba(56,189,248,0.5)]"
            >
              Contact Me
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
