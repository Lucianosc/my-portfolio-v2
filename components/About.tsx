"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="container p-4 flex flex-col gap-4">
      <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
      <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-end max-w-sm sm:max-w-lg min-w-[296px] mb-4"
        >
          <Image
            src={"/Capybara.png"}
            alt={"Logo image"}
            width={500}
            height={500}
          />
        </motion.div>
        <div className="flex flex-col space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
            className="text-start max-w-sm sm:max-w-lg min-w-[296px] flex flex-col justify-center"
          >
            <p className="text-2xl mb-4">Hi! I&apos;m Luciano Scaminaci.</p>
            <p className="text-xl mb-8">
              I was born in the middle of the Sierras in Tandil, Argentina.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
            className="text-start max-w-sm sm:max-w-lg min-w-[296px] flex flex-col justify-center"
          >
            <p className="text-2xl mb-4">Crafting intuitive Web interfaces.</p>
            <p className="text-xl mb-8">
              With a passion for nature, I love to bring organic and
              <span className="text-primary"> usability-focused</span> solutions
              for enhanced user experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}