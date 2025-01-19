import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Trophy, ChevronDown } from "lucide-react";
import Image from "next/image";
import { ACHIEVEMENTS } from "@/constants/constants";

const medalColors = {
  gold: "text-yellow-400",
  silver: "text-gray-400",
  bronze: "text-amber-700",
};

export function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div className="container p-4 w-full max-w-4xl mx-auto sm:p-8">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-4xl font-bold mb-8 text-center"
      >
        Achievements
      </motion.h2>
      <ul
        role="list"
        className="divide-y divide-background2 rounded-2xl overflow-hidden"
      >
        {ACHIEVEMENTS.map(
          (
            { title, logo, type, event, track, link, description, place },
            index
          ) => (
            <motion.li
              key={title}
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col py-4 sm:py-5 px-0 sm:px-4 transition-colors"
            >
              <div
                className="flex items-center justify-between gap-x-6 cursor-pointer sm:cursor-default"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex gap-x-4 items-center min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 relative rounded-full overflow-hidden">
                    <Image
                      src={logo}
                      alt={`${title} logo`}
                      height={48}
                      width={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-7 tracking-tight truncate">
                      {title}
                    </h3>
                    <p className="text-sm font-regular text-muted-foreground line-clamp-2">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Desktop view */}
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="flex items-center gap-2">
                      <Trophy
                        className={`h-5 w-5 ${
                          medalColors[type as keyof typeof medalColors]
                        }`}
                      />
                      <p className="text-sm font-medium leading-6">{place}</p>
                    </div>
                    <div className="mt-1 flex flex-col items-end">
                      <p className="text-sm leading-5 text-muted-foreground">
                        {event}
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {track}
                      </p>
                    </div>
                  </div>

                  {/* Mobile view toggle button */}
                  <div className="block sm:hidden">
                    <motion.div
                      animate={{ rotate: expandedId === index ? -180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-primary" />
                    </motion.div>
                  </div>

                  {/* External link - only visible on desktop or when expanded on mobile */}
                  {link && (
                    <div
                      className={`relative h-10 w-12 hidden sm:flex justify-center items-center rounded-lg overflow-hidden group cursor-pointer`}
                    >
                      <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 text-primary transition-colors group-hover:text-white"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable content for mobile */}
              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block sm:hidden overflow-hidden"
                  >
                    <div className="pt-4 flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy
                            className={`h-5 w-5 ${
                              medalColors[type as keyof typeof medalColors]
                            }`}
                          />
                          <p className="text-sm font-medium">{place}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {track}
                        </p>
                      </div>

                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                        >
                          <span className="text-sm">View Project</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        )}
      </ul>
    </div>
  );
}

export default Achievements;
