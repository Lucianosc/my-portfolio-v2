import { motion } from "framer-motion";
import Image from "next/image";

const SPLASH_POSITIONS = [
  { translateX: "-25%", translateY: "30%" }, // violet
  { translateX: "-3%", translateY: "25%" }, // black
  { translateX: "25%", translateY: "-5%" }, //red
  { translateX: "25%", translateY: "10%" }, // grey
  { translateX: "-25%", translateY: "0" }, // pink
  { translateX: "5%", translateY: "-10%" }, // orange
  { translateX: "-10%", translateY: "-5%" }, // light blue
  // { translateX: "-10%", translateY: "10%" }, // green
];

export function Hero() {
  return (
    <section className="relative flex items-center justify-center w-full max-w-7xl overflow-hidden">
      <div className="relative w-full aspect-square max-w-4xl flex items-center justify-center">
        {/* Front text layer */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 p-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold py-4 bg-background/60 rounded-xl">
            Luciano Scaminaci
          </h1>
          <h2 className="text-3xl md:text-4xl bg-background/60 rounded-xl pb-4">
            Frontend Developer
          </h2>
        </motion.div>

        {/* Paint splashes */}
        {SPLASH_POSITIONS.map(({ translateX, translateY }, index) => (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: translateX,
              y: translateY,
            }}
            transition={{
              duration: 0.05,
              delay: 1.3 + Math.log10(index + 1) + index / 20,
              opacity: { duration: 0.3 },
            }}
            key={`splash-${index}`}
            className={`absolute inset-0 flex items-center justify-center`}
          >
            <div className="relative h-full w-full">
              <Image
                src={`/paint-splashes/splash-${index + 1}.svg`}
                alt={`paint splash-${index + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
