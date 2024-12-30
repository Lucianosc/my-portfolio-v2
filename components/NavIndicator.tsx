"use client";

import { motion, useScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export function NavIndicator({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) {
  // Initialize state to false and use useEffect for client-side only code
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only initialize useScroll after component is mounted
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hideIndicator = useCallback(
    debounce(() => setIsVisible(false), 1200),
    []
  );

  const showIndicator = useCallback(() => {
    setIsVisible(true);
    hideIndicator();
  }, [hideIndicator]);

  useEffect(() => {
    if (!mounted) return;

    const unsubscribe = scrollY.on("change", showIndicator);
    return () => unsubscribe();
  }, [scrollY, showIndicator, mounted]);

  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <motion.div
      initial={false} // Prevent initial animation on mount
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 top-4 z-50 bg-background/40 rounded-full p-2 py-4 pointer-events-none"
    >
      <div className="relative flex items-center justify-center py-3">
        <div className="absolute w-[1px] bg-white h-full rounded-full"></div>
        <div className="flex flex-col items-center gap-4 w-4">
          {Array.from({ length: total }).map((_, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={false} // Prevent initial animation on mount
                animate={{
                  width: index === activeIndex ? 16 : 10,
                  height: index === activeIndex ? 16 : 10,
                  backgroundColor:
                    index === activeIndex ? "#ff8a1a" : "#ffffff",
                }}
                transition={{
                  duration: 0.6,
                }}
                className="rounded-full flex items-center justify-center"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
