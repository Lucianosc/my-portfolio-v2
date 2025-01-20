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
    threshold: 0.2,
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
      <div className="divide-y divide-background2 rounded-2xl overflow-hidden">
        {ACHIEVEMENTS.map(
          (
            {
              title,
              projectLogo,
              compLogo,
              type,
              event,
              track,
              link,
              description,
              place,
            },
            index
          ) => (
            <motion.div
              key={title}
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="py-4 sm:py-5 px-0 sm:px-4 transition-colors"
            >
              {/* Desktop View */}
              <div className="hidden sm:grid grid-cols-12 gap-4">
                {/* Competition Logo and Details Section - 2 columns */}
                <div className="col-span-5 flex gap-x-4">
                  <div className="flex-shrink-0 w-12 h-12 relative rounded-full overflow-hidden mb-2 bg-white">
                    <Image
                      src={compLogo}
                      alt={`${event} logo`}
                      height={48}
                      width={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-md leading-5 text-white">{event}</p>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {track}
                    </p>
                    <div className="flex items-center gap-2">
                      <Trophy
                        className={`h-6 w-6 ${
                          medalColors[type as keyof typeof medalColors]
                        }`}
                      />
                      <p className="text-md font-medium leading-6 text-muted-foreground">
                        {place}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Logo, Title and Description Section - 4 columns */}
                <div className="col-span-6 flex gap-x-4">
                  <div className="flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden">
                    <Image
                      src={projectLogo}
                      alt={`${title} logo`}
                      height={48}
                      width={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold leading-7 tracking-tight">
                      {title}
                    </h3>
                    <p className="text-sm font-regular text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Link Section - 1 column */}
                <div className="col-span-1 flex justify-end items-center">
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-2 w-fit"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden block">
                <div
                  className="gap-x-1 sm:gap-x-6 cursor-pointer grid grid-cols-12"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex gap-x-3 items-center min-w-0 col-span-7">
                    <div className="flex-shrink-0 w-12 h-12 relative rounded-full overflow-hidden mb-2 bg-white">
                      <Image
                        src={compLogo}
                        alt={`${event} logo`}
                        height={48}
                        width={48}
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`flex flex-col ${
                        expandedId !== index && "gap-1"
                      }`}
                    >
                      <p className="text-md leading-5 text-white">{event}</p>
                      <AnimatePresence>
                        {expandedId === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs leading-5 text-muted-foreground">
                              {track}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center gap-2">
                        <Trophy
                          className={`h-6 w-6 ${
                            medalColors[type as keyof typeof medalColors]
                          }`}
                        />
                        <p className="text-md font-medium leading-6 text-muted-foreground">
                          {place}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 col-span-4 ml-1">
                    <div
                      className={`flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden ${
                        expandedId === index && "hidden"
                      }`}
                    >
                      <Image
                        src={projectLogo}
                        alt={`${title} logo`}
                        height={48}
                        width={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <h3
                        className={`text-base font-semibold leading-7 tracking-tight ${
                          expandedId === index && "hidden"
                        }`}
                      >
                        {title}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === index ? -180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="col-span-1 flex justify-center items-center"
                  >
                    <ChevronDown className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedId === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <div className="flex justify-between">
                          <div className="flex gap-1 flex-col">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden">
                                <Image
                                  src={projectLogo}
                                  alt={`${title} logo`}
                                  height={48}
                                  width={48}
                                  className="object-contain"
                                />
                              </div>
                              <h3 className="text-base font-semibold leading-8 tracking-tight">
                                {title}
                              </h3>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-regular text-muted-foreground">
                                {description}
                              </p>
                            </div>
                          </div>

                          {link && (
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 flex-shrink-0"
                            >
                              <span className="text-sm">View Project</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

export default Achievements;
