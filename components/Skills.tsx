/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { debounce } from "@/utils/functions";

// Golden ratio constant
const PHI = 1.618033988749895;

// Skill configurations with URLs
const skills = [
  {
    name: "Next.js",
    logo: "/tech-logos/next-logo.svg",
    url: "https://nextjs.org",
  },
  {
    name: "React",
    logo: "/tech-logos/react-logo.svg",
    url: "https://reactjs.org",
  },
  {
    name: "TypeScript",
    logo: "/tech-logos/typescript-logo.svg",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "JavaScript",
    logo: "/tech-logos/javascript-logo.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Tailwind CSS",
    logo: "/tech-logos/tailwind-logo.svg",
    url: "https://tailwindcss.com",
  },
  {
    name: "Solidity",
    logo: "/tech-logos/solidity-logo.svg",
    url: "https://soliditylang.org",
  },
  {
    name: "Viem",
    logo: "/tech-logos/viem-logo.svg",
    url: "https://viem.sh",
    size: "w-20",
  },
  {
    name: "Wagmi",
    logo: "/tech-logos/wagmi-logo.svg",
    url: "https://wagmi.sh",
    size: "w-32",
  },
  { name: "Git", logo: "/tech-logos/git-logo.svg", url: "https://git-scm.com" },
  {
    name: "GraphQL",
    logo: "/tech-logos/graphql-logo.svg",
    url: "https://graphql.org",
  },
  {
    name: "Vitest",
    logo: "/tech-logos/vitest-logo.svg",
    url: "https://vitest.dev/",
  },
  { name: "Jest", logo: "/tech-logos/jest-logo.svg", url: "https://jestjs.io" },
];

const getSpiralPosition = (index: number) => {
  const angle = (index * (2 * Math.PI)) / PHI;
  const radius = Math.sqrt(index) * 20;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    scale: 1 - index * 0.03,
  };
};

const getFloatingAnimation = (index: number) => {
  const baseAmplitude = 20;
  const angleOffset = (index * Math.PI) / skills.length;

  return {
    x: [
      Math.cos(angleOffset) * baseAmplitude,
      Math.cos(angleOffset + Math.PI) * baseAmplitude,
    ],
    y: [
      Math.sin(angleOffset) * baseAmplitude,
      Math.sin(angleOffset + Math.PI) * baseAmplitude,
    ],
  };
};

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="container px-4 py-8 h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center h-full"
      >
        <h2 className="text-4xl font-bold mb-8 text-center">Skills</h2>
        <div className="relative w-full max-w-4xl h-full flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-6 sm:p-4 md:p-2 lg:p-0">
          {skills.map((skill, index) => (
            <SkillBadge
              key={skill.name}
              {...skill}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Skills;

const SkillBadge = ({
  name,
  logo,
  url,
  size,
  index,
  inView,
}: {
  name: string;
  logo: string;
  url: string;
  size?: string;
  index: number;
  inView: boolean;
}) => {
  const controls = useAnimation();
  let spiralPos = getSpiralPosition(index + 1);
  const floatingAnim = getFloatingAnimation(index);

  // Adjust positions for specific skills
  if (name === "JavaScript")
    spiralPos = { ...spiralPos, y: spiralPos.y + 90, x: spiralPos.x + 30 };
  if (name === "Git")
    spiralPos = { ...spiralPos, y: spiralPos.y + 20, x: spiralPos.x + 30 };
  if (name === "Viem") spiralPos.x = spiralPos.x + 40;
  if (name === "Solidity") spiralPos.y = spiralPos.y - 60;
  if (name === "Wagmi") spiralPos.x = spiralPos.x - 40;

  useEffect(() => {
    if (inView) {
      controls.start({
        x: floatingAnim.x,
        y: floatingAnim.y,
        transition: {
          duration: 3 + index * 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      });
    }
  }, [inView]);

  const startAnimation = useCallback(async () => {
    await controls.start({
      x: floatingAnim.x[0],
      y: floatingAnim.y[0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    });

    controls.start({
      x: floatingAnim.x,
      y: floatingAnim.y,
      transition: {
        duration: 3 + index * 0.2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [controls, floatingAnim, index]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ zIndex: skills.length - index }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileHover={{ zIndex: 30 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: spiralPos.scale,
              x: spiralPos.x,
              y: spiralPos.y,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.1,
      }}
    >
      <motion.div
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={debounce(startAnimation)}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Badge
            className="text-lg py-2 px-4 bg-background whitespace-nowrap cursor-pointer 
            scale-100 sm:scale-110 md:scale-115 lg:scale-125 
            hover:scale-125 sm:hover:scale-135 md:hover:scale-140 lg:hover:scale-150 
            transition-all duration-300 flex items-center gap-2 hover:bg-background ease-in-out border border-background2"
          >
            <div
              className={`${
                size ? size : "w-10"
              } w-10 h-10 relative overflow-hidden rounded-md`}
            >
              <Image
                src={logo}
                alt={`${name} logo`}
                fill
                className="object-contain"
              />
            </div>
            {name && !size && name}
          </Badge>
        </a>
      </motion.div>
    </motion.div>
  );
};
