import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/constants/constants";
import { ShownItem } from "./ShownItem";
import { ProjectGrid } from "./ProjectGrid";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[number] | null
  >(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="container max-w-6xl p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        <ProjectGrid onSelect={setSelectedProject} inView={inView} />
      </motion.div>
      <AnimatePresence>
        {selectedProject && (
          <ShownItem
            {...selectedProject}
            key="item"
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
