"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink, Trophy } from "lucide-react";
import { ACHIEVEMENTS } from "@/constants/constants";

const trophyColors = {
  gold: "text-yellow-400",
  silver: "text-gray-400",
  bronze: "text-amber-700",
};

export function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="p-4 container sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-background2">
                <CardHeader className="flex flex-row items-start gap-3 p-3">
                  <Trophy
                    className={`h-6 w-6 flex-shrink-0 mt-[2px] ${
                      trophyColors[
                        achievement.type as keyof typeof trophyColors
                      ]
                    }`}
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-medium">
                        {achievement.place}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        • {achievement.track}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {achievement.event}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1.5 p-3 pt-0">
                  <h3 className="text-base font-semibold leading-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {achievement.description}
                  </p>
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-xs inline-flex gap-1"
                    >
                      View Project <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
