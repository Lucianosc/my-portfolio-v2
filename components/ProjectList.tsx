import React, { useRef, useEffect } from "react";
import {
  motion,
  useTransform,
  type MotionValue,
  useSpring,
} from "framer-motion";
import { PROJECTS } from "@/constants/constants";
import { ScreenSize } from "@/hooks/useScreenWidth";
import { ProjectCard } from "./ProjectCard";

export function ProjectList({
  onSelect,
  inView,
  scrollProgress,
  breakpoint,
}: {
  onSelect: React.Dispatch<
    React.SetStateAction<(typeof PROJECTS)[number] | null>
  >;
  inView: boolean;
  breakpoint: ScreenSize | null;
  scrollProgress: MotionValue<number>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = React.useState(0);
  const lastScrollValue = useRef(0);
  const isModalOpen = useRef(false);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const computedStyle = window.getComputedStyle(container);
      const paddingLeft = parseInt(computedStyle.paddingLeft, 12);
      const paddingRight = parseInt(computedStyle.paddingRight, 12);
      const totalWidth =
        container.scrollWidth -
        container.clientWidth +
        paddingLeft +
        paddingRight;
      setMaxScroll(totalWidth);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value) => {
      if (!isModalOpen.current) {
        lastScrollValue.current = value;
      }
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  useEffect(() => {
    const handleSelectChange = () => {
      isModalOpen.current = true;

      const timer = setTimeout(() => {
        isModalOpen.current = false;
        scrollProgress.set(lastScrollValue.current);
      }, 350); // Match the animation duration of 0.35s

      return () => clearTimeout(timer);
    };
    handleSelectChange();
  }, [onSelect, scrollProgress]);

  const scrollXProgress = useTransform(scrollProgress, [0, 1], [0, -maxScroll]);

  const smoothScrollX = useSpring(scrollXProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative w-full">
      <motion.div
        ref={containerRef}
        className="flex flex-col sm:flex-row pb-12 gap-8 sm:gap-0"
        transition={{
          duration: 0.35,
          ease: "easeInOut",
          layout: { duration: 0.35 },
        }}
        style={{ x: breakpoint === null ? 0 : smoothScrollX }}
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            inView={inView}
            index={index}
            project={project}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default ProjectList;
