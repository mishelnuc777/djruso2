import { useState, useEffect } from 'react';

/**
 * Hook to detect whether the user is on a true desktop device:
 * - width >= 769px
 * - fine pointer with hover capability ((hover: hover) and (pointer: fine))
 * - has not requested reduced motion
 *
 * Prevents large touchscreen tablets (e.g. 1024px) and mobile devices
 * from running heavy ambient animations.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mqWidth = window.matchMedia('(min-width: 769px)');
    const mqPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const check = () => {
      const widthMatches = mqWidth.matches;
      const finePointerMatches = mqPointer.matches;
      const reducedMotionMatches = mqMotion.matches;

      setIsDesktop(widthMatches && finePointerMatches && !reducedMotionMatches);
    };

    check();

    mqWidth.addEventListener('change', check);
    mqPointer.addEventListener('change', check);
    mqMotion.addEventListener('change', check);

    return () => {
      mqWidth.removeEventListener('change', check);
      mqPointer.removeEventListener('change', check);
      mqMotion.removeEventListener('change', check);
    };
  }, []);

  return isDesktop;
}
