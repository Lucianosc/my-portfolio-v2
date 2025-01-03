"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full container bg-background text-white py-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Luciano Scaminaci
        </h1>
        <h2 className="text-3xl md:text-4xl mb-8">Frontend Developer</h2>
        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-200"
          onClick={scrollToProjects}
        >
          View My Work <ArrowDown className="ml-2" />
        </Button>
      </motion.div>
    </section>
  );
}
