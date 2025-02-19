import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useRef } from "react";
import AboutBackground from "./backgrounds/AboutBackground";

const messages = [
  {
    id: 1,
    text: <>I was born in the middle of the Sierras in Tandil, Argentina.</>,
  },
  {
    id: 2,
    text: (
      <>
        I&apos;m passionate about nature and love to bring organic,
        <span className="text-secondary"> usability-focused</span> solutions.
      </>
    ),
  },
  {
    id: 3,
    text: (
      <>
        I try to make things easy, always keeping an eye on{" "}
        <span className="text-secondary">user experience</span>.
      </>
    ),
  },
];

interface MessageBubbleProps {
  message: (typeof messages)[0];
  y: MotionValue<number>;
}

const MessageBubble = ({ message, y }: MessageBubbleProps) => (
  <motion.div
    style={{ y }}
    className="relative z-20 rounded-3xl rounded-bl-none border border-background overflow-hidden bg-background"
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <motion.div
      className="group max-w-[480px] relative bg-foreground/10  text-foreground p-4 "
      whileHover="hover"
    >
      <p className="lg:text-xl text-lg sm:text-base md:text-lg relative z-10">
        {message.text}
      </p>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent"
        initial={{ x: "-100%" }}
        variants={{
          hover: { x: "-10%" },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  </motion.div>
);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -35]);

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const spring1 = useSpring(y1, springConfig);
  const spring2 = useSpring(y2, springConfig);
  const spring3 = useSpring(y3, springConfig);

  return (
    <section
      ref={containerRef}
      className="container px-4 py-8 flex flex-col gap-4 min-h-screen relative overflow-hidden"
    >
      <motion.div className="flex flex-col gap-4 items-center justify-center flex-1">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          About Me
        </motion.h2>

        <div
          ref={ref}
          className="flex flex-col sm:flex-row w-full max-w-6xl mx-auto gap-8 justify-between items-center"
        >
          {/* Image Container - Takes up 50% width on sm screens and above */}
          <div className="w-full sm:w-1/2 flex justify-center items-center relative z-20">
            <motion.div
              animate={{
                y: [-20, 10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="relative w-full max-w-md"
            >
              <Image
                src="/Capybara.png"
                alt="Logo image"
                width={500}
                height={500}
                className="relative z-10 w-full h-auto"
              />
              <div className="absolute inset-0 bg-foreground/5 rounded-full blur-3xl animate-pulse" />
            </motion.div>
          </div>

          {/* Messages Container - Takes up 50% width on sm screens and above */}
          <div className="w-full sm:w-1/2 flex flex-col space-y-6 items-center">
            <MessageBubble message={messages[0]} y={spring1} />
            <MessageBubble message={messages[1]} y={spring2} />
            <MessageBubble message={messages[2]} y={spring3} />
          </div>
        </div>
      </motion.div>
      <AboutBackground />
    </section>
  );
}

export default About;
