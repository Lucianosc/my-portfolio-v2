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
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const hideIndicator = useCallback(
    debounce(() => setIsVisible(false), 1500),
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

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8, scaleY: 0.9 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scaleX: isVisible ? 1 : 0.8,
        scaleY: isVisible ? 1 : 0.9,
      }}
      transition={{
        duration: 0.3,
      }}
      className="fixed right-4 top-4 z-50 bg-background/40 rounded-full p-2 py-4 pointer-events-none"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-[1px] bg-white h-full rounded-full"></div>
        <div className="flex flex-col items-center gap-4 w-4">
          {Array.from({ length: total }).map((_, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={false}
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
