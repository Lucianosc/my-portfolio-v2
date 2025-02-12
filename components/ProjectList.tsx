import React, { useRef, useEffect } from "react";
import {
  motion,
  useTransform,
  type MotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/constants/constants";
import { ScreenSize } from "@/hooks/useScreenWidth";

interface CardProps {
  onSelect: (project: (typeof PROJECTS)[number]) => void;
  project: (typeof PROJECTS)[number];
  className?: string;
  index: number;
  inView: boolean;
}

function ProjectCard({ inView, index, project, onSelect }: CardProps) {
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
        transition={{ duration: 0.25, ease: "easeInOut" }}
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="absolute inset-0"
          layoutId={`card-image-container-${id}`}
        >
          <Image
            src={imageUri || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-t from-black/70  to-transparent"
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6"
            >
              <motion.h3
                className="text-white text-2xl font-bold mb-2"
              >
                {project.title}
              </motion.h3>
              <motion.div
                className="flex flex-wrap gap-2"
              >
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

  // Track scroll position
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value) => {
      if (!isModalOpen.current) {
        lastScrollValue.current = value;
      }
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  // Handle modal state changes
  useEffect(() => {
    const handleSelectChange = () => {
      isModalOpen.current = true;

      // When modal closes, restore the last scroll position
      const timer = setTimeout(() => {
        isModalOpen.current = false;
        scrollProgress.set(lastScrollValue.current);
      }, 100);

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
        // className={`${
        //   breakpoint === null
        //     ? "justify-center items-center flex-col gap-8"
        //     : ""
        // } flex sm:flex-row pb-12`}
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
