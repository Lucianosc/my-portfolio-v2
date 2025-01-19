"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function CustomCursor({
  initialPosition = { x: 0, y: 0 }, // default position
  children,
}: {
  initialPosition: { x: number; y: number };
  children: React.ReactNode;
}) {
  const [mousePosition, setMousePosition] = useState(initialPosition);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      initial={{ x: initialPosition.x - 56, y: initialPosition.y - 20 }}
      animate={{
        x: mousePosition.x - 56,
        y: mousePosition.y - 20,
      }}
      transition={{
        type: "spring",
        mass: 0.0005,
        stiffness: 5000,
        damping: 15,
      }}
      layout
    >
      <Button className="">{children}</Button>
    </motion.div>
  );
}
