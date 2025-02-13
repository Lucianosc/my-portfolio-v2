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

export function ProjectCard({ inView, index, project, onSelect }: CardProps) {
  const { id, title, imageUri } = project;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer bg-background2 aspect-[2048/1230] md:w-[620px] sm:w-[420px] w-[95vw] mx-auto sm:mx-8"
        onClick={() => onSelect(project)}
        layoutId={`card-container-${id}`}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
          layout: { duration: 0.35 },
        }}
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="absolute inset-0"
          layoutId={`card-image-container-${id}`}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
            layout: { duration: 0.35 },
          }}
        >
          <Image
            src={imageUri || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 768px) 420px, 620px"
            className="object-cover"
          />
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            whileHover={{ opacity: 1 }}
          >
            <motion.div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.h3 className="text-white text-2xl font-bold mb-2">
                {project.title}
              </motion.h3>
              <motion.div className="flex flex-wrap gap-2">
                {project.techsUsed.map((tech) => (
                  <span
                    key={tech + "_" + project.id}
                    className="px-3 py-1 bg-background/80 rounded-full text-white text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
