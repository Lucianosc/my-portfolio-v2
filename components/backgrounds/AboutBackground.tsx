"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function AboutBackground() {
  const [particles, setParticles] = useState<Array<{ left: string }>>([]);

  useEffect(() => {
    // Generate random positions only on the client side
    const positions = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
    }));
    setParticles(positions);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0" />
      {particles.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-foreground rounded-full"
          animate={{
            y: [0, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: position.left,
            top: "100%",
          }}
        />
      ))}
    </motion.div>
  );
}
