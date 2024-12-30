"use client";

import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { NavIndicator } from "@/components/NavIndicator";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { Component: Hero, id: "hero" },
    { Component: About, id: "about" },
    { Component: Skills, id: "skills" },
    { Component: Achievements, id: "achievements" },
    { Component: Projects, id: "projects" },
    { Component: Contact, id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY;
      // Get viewport height
      const viewportHeight = window.innerHeight;
      // Calculate which section is currently in view
      const currentSection = Math.floor(
        (scrollPosition + viewportHeight / 2) / viewportHeight
      );
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavIndicator activeIndex={activeSection} total={sections.length} />
      <main className="flex min-h-screen flex-col items-center justify-between snap-y snap-mandatory text-white">
        {sections.map(({ Component, id }, index) => (
          <div
            key={id}
            className={`w-full min-h-screen flex flex-col items-center justify-center ${
              index % 2 === 0 ? "bg-background" : "bg-background2"
            } snap-center`}
          >
            <Component />
          </div>
        ))}
      </main>
    </>
  );
}
