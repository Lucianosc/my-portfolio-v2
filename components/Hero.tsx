import { motion } from "framer-motion";
import { useRef } from "react";
import { Mouse, Pointer } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <section
      ref={sectionRef}
      className="relative flex justify-center min-h-screen"
    >
      <div className="max-w-4xl h-fit sticky top-1/2 left-0 -translate-y-1/2">
        {/* CTA Animation */}
        <motion.div
          className="cursor-default relative mx-auto w-fit justify-center -top-6 left-0 sm:right-0 flex items-center gap-2 text-white text-sm bg-background/40 px-2 py-1 rounded-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {isMobile ? (
            <Pointer className="h-4 w-4" />
          ) : (
            <Mouse className="h-4 w-4" />
          )}
          <span className="font-medium">
            {isMobile ? "Tap me" : "Click me"}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col gap-1 p-4 sm:items-center relative"
        >
          <h1 className="text-5xl md:text-7xl font-bold p-4 bg-background/95 rounded-xl sm:text-center">
            Luciano Scaminaci
          </h1>
          <h2 className="text-3xl md:text-4xl p-4 bg-background/95 rounded-xl sm:text-center">
            Frontend Developer{" "}
            <span className="font-bold hidden sm:inline-block">{"</>"}</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
