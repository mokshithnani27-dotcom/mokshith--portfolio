import { useEffect, useState, type ReactNode } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackIcon?: ReactNode;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle = 'Visual Preview',
  fallbackIcon,
  priority = false,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0b1226] via-[#0e1530] to-[#12102c] text-slate-300 p-6 text-center ${className}`}
      >
        {fallbackIcon && (
          <div className="text-sky-400/90" aria-hidden="true">
            {fallbackIcon}
          </div>
        )}
        <span className="font-display text-sm font-medium tracking-wide text-slate-300">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
