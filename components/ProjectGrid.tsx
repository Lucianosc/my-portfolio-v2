"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/constants/constants";

interface CardProps {
  onSelect: (project: (typeof PROJECTS)[number]) => void;
  project: (typeof PROJECTS)[number];
  className?: string;
  index: number;
  inView: boolean;
}

function ProjectCard({
  inView,
  index,
  project,
  onSelect,
  className,
}: CardProps) {
  const { id, title, imageUri } = project;
  return (
    <motion.li
      className={`relative h-64 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="w-full h-full relative block pointer-events-none"
        onClick={() => onSelect(project)}
      >
        <motion.div
          className="pointer-events-auto relative rounded-2xl bg-background2 overflow-hidden w-full h-full mx-auto"
          layoutId={`card-container-${id}`}
        >
          <motion.div
            className="relative top-0 left-0 overflow-hidden h-64 sm:h-80 md:h-96 w-screen bp820:w-[820px]"
            layoutId={`card-image-container-${id}`}
          >
            <Image
              src={imageUri}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.li>
  );
}

export function ProjectGrid({
  onSelect,
  inView,
}: {
  onSelect: React.Dispatch<
    React.SetStateAction<(typeof PROJECTS)[number] | null>
  >;
  inView: boolean;
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
      {PROJECTS.map((project, index) => (
        <ProjectCard
          inView={inView}
          index={index}
          key={project.id}
          project={project}
          className={`relative rounded-2xl overflow-hidden cursor-pointer z-10 ${
            index % 4 === 0 || (index + 1) % 4 === 0
              ? "col-span-1 md:col-span-3"
              : "col-span-1 md:col-span-2"
          }`}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
