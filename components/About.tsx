"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="container p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <p className="text-xl max-w-3xl mx-auto text-center">
          I&apos;m a passionate senior frontend developer with over 8 years of
          experience in creating beautiful, responsive, and high-performance web
          applications. My expertise includes Next.js, React, TypeScript, and
          modern CSS frameworks like Tailwind CSS.
        </p>
      </motion.div>
    </section>
  );
}
