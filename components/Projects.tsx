import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { PROJECTS } from "@/constants/constants";
import { ShownItem } from "./ShownItem";
import ProjectList from "./ProjectList";
import { useScreenWidth } from "@/hooks/useScreenWidth";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[number] | null
  >(null);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const { breakpoint } = useScreenWidth();

  const containerHeight = PROJECTS.length * 50;
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full md:px-4"
      style={{ height: breakpoint === null ? "auto" : `${containerHeight}vh` }}
    >
      <motion.div
        ref={containerRef}
        className={`absolute border-l mx-auto h-full left-24 hidden sm:block -top-[100vh]`}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          borderStyle: "dashed",
          borderImageSlice: "1",
          borderImageSource:
            "repeating-linear-gradient(to bottom, #ffffff66 0 15px, transparent 15px 40px)",
          height: `${containerHeight * 2}vh`,
        }}
      ></motion.div>
      <motion.section
        ref={ref}
        className="w-full max-w-6xl mx-auto py-4 sm:py-8 md:border border-background2 rounded-2xl overflow-hidden sm:sticky relative sm:top-[10%] md:top-[15%]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <ProjectList
            onSelect={setSelectedProject}
            inView={inView}
            scrollProgress={scrollYProgress}
            breakpoint={breakpoint}
          />
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {selectedProject && (
          <ShownItem
            {...selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
