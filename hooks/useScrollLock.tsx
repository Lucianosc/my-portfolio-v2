import { useEffect } from "react";

type UseScrollLockOptions = {
  enabled?: boolean;
};

export function useScrollLock({ enabled = true }: UseScrollLockOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    // Store initial overflow
    const originalOverflow = document.body.style.overflow;

    // Prevent scroll
    document.body.style.overflow = "hidden";

    // Prevent scroll events using capture phase
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Add event listeners with capture phase
    window.addEventListener("wheel", preventScroll, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchmove", preventScroll, {
      passive: false,
      capture: true,
    });

    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
    };
  }, [enabled]);
}
