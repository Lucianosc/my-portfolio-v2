import { useState, useEffect } from "react";

export type ScreenSize = "sm" | "md" | "lg" | "xl" | "2xl";

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const [breakpoint, setBreakpoint] = useState<ScreenSize | null>(null);

  useEffect(() => {
    // Handle SSR
    if (typeof window === "undefined") return;

    function handleResize() {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Set breakpoint based on Tailwind's default breakpoints
      if (width < 640) setBreakpoint(null); // mobile
      else if (width < 768) setBreakpoint("sm");
      else if (width < 1024) setBreakpoint("md");
      else if (width < 1280) setBreakpoint("lg");
      else if (width < 1536) setBreakpoint("xl");
      else setBreakpoint("2xl");
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Set initial size
    handleResize();

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  return {
    screenWidth,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
}
