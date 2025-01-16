import { useMousePosition } from "@/hooks/useMousePosition";
import { motion, useSpring, useTransform } from "framer-motion";
// import { Code2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface SplashPosition {
  translateX: string;
  translateY: string;
  depth?: number;
}

type SplashImageProps = SplashPosition & {
  normalizedX?: number;
  normalizedY?: number;
  index: number;
};

const SPLASH_POSITIONS: SplashPosition[] = [
  { translateX: "-25%", translateY: "30%", depth: 0.4 }, // #04d9ff
  { translateX: "-3%", translateY: "30%", depth: 0.8 }, // #FF8A1A
  { translateX: "25%", translateY: "-5%", depth: 0.7 }, // #2343AD
  { translateX: "25%", translateY: "10%", depth: 0.6 }, // #14C13A
  { translateX: "-25%", translateY: "0", depth: 0.5 }, // #8018A9
  { translateX: "5%", translateY: "-10%", depth: 0.4 }, // #FF1800
  { translateX: "-10%", translateY: "-5%", depth: 0.3 }, // #FFB000
];

const MOVEMENT_RANGE = 10;
const SPRING_CONFIG = { stiffness: 1000, damping: 300, mass: 3 };

function addToPercentage(percentStr: string, value: number): string {
  const percentage = parseInt(percentStr);
  if (isNaN(percentage)) {
    throw new Error("Invalid percentage string");
  }
  return `${percentage + value}%`;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { normalizedX, normalizedY } = useMousePosition(sectionRef);
  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center w-full overflow-hidden min-h-screen"
    >
      <div className="relative w-full aspect-square max-w-4xl flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col justify-center z-30 p-4 items-start sm:items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold p-4 bg-background/60 rounded-xl text-start sm:text-center w-fit">
            Luciano Scaminaci
          </h1>
          <h2 className="text-3xl md:text-4xl bg-background/60 rounded-xl px-4 pb-4 text-start sm:text-center w-fit">
            Frontend Developer
          </h2>
        </motion.div>

        {SPLASH_POSITIONS.map((splashImg, index) => (
          <SplashImage
            {...splashImg}
            key={`splash-${index}`}
            index={index}
            normalizedX={normalizedX}
            normalizedY={normalizedY}
          />
        ))}
      </div>
    </section>
  );
}

const transform = (x: number) => x * 2 - 1;

function SplashImage({
  normalizedX = 0.5,
  normalizedY = 0.5,
  depth = 0.5,
  translateX,
  translateY,
  index,
}: SplashImageProps) {
  // Create spring-animated values for smooth movement
  const springX = useSpring(0, SPRING_CONFIG);
  const springY = useSpring(0, SPRING_CONFIG);

  // Update spring values based on mouse position
  springX.set(transform(normalizedX) * MOVEMENT_RANGE * depth);
  springY.set(transform(normalizedY) * MOVEMENT_RANGE * depth);

  // Transform spring values into percentages
  const x = useTransform(springX, (latest) =>
    addToPercentage(translateX, latest)
  );

  const y = useTransform(springY, (latest) =>
    addToPercentage(translateY, latest)
  );
  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.05,
        delay: 1.3 + Math.log10(index + 1) + index / 20,
        opacity: { duration: 0.3 },
      }}
      key={`splash-${index}`}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <motion.div style={{ x, y }} className="relative h-full w-full">
        <Image
          src={`/paint-splashes/splash-${index + 1}.svg`}
          alt={`paint splash-${index + 1}`}
          fill
          className="object-contain"
          priority
        />
        {/* {index === 1 && (
          <Code2 className="top-[45%] left-[53%] absolute w-10 h-10 animate-pulse duration-1500 text-background" />
        )} */}
      </motion.div>
    </motion.div>
  );
}

export default Hero;
