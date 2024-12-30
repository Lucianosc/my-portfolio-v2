"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/yourusername/ecommerce-platform",
    live: "https://ecommerce-platform-demo.vercel.app",
  },
  {
    title: "Task Management App",
    description:
      "A real-time task management application using React, Redux, and Firebase.",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/yourusername/task-management-app",
    live: "https://task-management-app-demo.vercel.app",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that displays real-time weather data using OpenWeatherMap API.",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/yourusername/weather-dashboard",
    live: "https://weather-dashboard-demo.vercel.app",
  },
];

export function Projects() {
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
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
