/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { NavIndicator } from "@/components/NavIndicator";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.5 });
  const [achievementsRef, achievementsInView] = useInView({ threshold: 0.5 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.5 });
  const [contactRef, contactInView] = useInView({ threshold: 0.5 });

  const sections = [
    { id: "hero", ref: heroRef, inView: heroInView },
    { id: "about", ref: aboutRef, inView: aboutInView },
    { id: "skills", ref: skillsRef, inView: skillsInView },
    { id: "achievements", ref: achievementsRef, inView: achievementsInView },
    { id: "projects", ref: projectsRef, inView: projectsInView },
    { id: "contact", ref: contactRef, inView: contactInView },
  ];

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        scrollToSection(hash);
      }
    };

    handleHashChange(); // Handle initial hash
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToSection]);

  // Update URL when section changes
  useEffect(() => {
    const visibleSections = sections.map((section, index) => ({
      index,
      inView: section.inView,
      id: section.id,
    }));

    const currentlyVisible = visibleSections.find((section) => section.inView);
    if (currentlyVisible) {
      setActiveSection(currentlyVisible.index);
      const newUrl = `${window.location.pathname}#${currentlyVisible.id}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [
    heroInView,
    aboutInView,
    skillsInView,
    achievementsInView,
    projectsInView,
    contactInView,
    sections,
  ]);

  const sectionComponents = [
    { Component: Hero, id: "hero", ref: heroRef },
    { Component: About, id: "about", ref: aboutRef },
    { Component: Skills, id: "skills", ref: skillsRef },
    { Component: Achievements, id: "achievements", ref: achievementsRef },
    { Component: Projects, id: "projects", ref: projectsRef },
    { Component: Contact, id: "contact", ref: contactRef },
  ];

  return (
    <>
      <NavIndicator activeIndex={activeSection} total={sections.length} />
      <main className="flex min-h-screen flex-col items-center justify-between text-white">
        {sectionComponents.map(({ Component, id, ref }, index) => (
          <div
            key={id}
            ref={ref}
            id={id}
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
