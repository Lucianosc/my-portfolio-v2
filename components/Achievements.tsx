"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const achievements = [
  {
    title: "First Place",
    event: "Global AI Hackathon 2023",
    description:
      "Developed an AI-powered accessibility tool for visually impaired users.",
  },
  {
    title: "Best UI/UX Design",
    event: "Web3 Buildathon 2022",
    description:
      "Created a decentralized social media platform with innovative user interface.",
  },
  {
    title: "Innovation Award",
    event: "Sustainable Tech Hackathon 2021",
    description: "Built an eco-friendly smart home energy management system.",
  },
  {
    title: "People's Choice",
    event: "HealthTech Challenge 2020",
    description:
      "Developed a telemedicine application for remote patient monitoring.",
  },
];

export function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {achievement.event}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
