"use client";

import { useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { NavIndicator } from "@/components/NavIndicator";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

const SECTION_COMPONENTS = {
  hero: Hero,
  about: About,
  skills: Skills,
  projects: Projects,
  achievements: Achievements,
  contact: Contact,
} as const;

type SectionId = keyof typeof SECTION_COMPONENTS;

export default function Home() {
  // Create refs for each section with the intersection observer
  const [heroRef, heroInView, heroEntry] = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "-1px 0px -1px 0px",
  });
  const [aboutRef, aboutInView, aboutEntry] = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "-1px 0px -1px 0px",
  });
  const [skillsRef, skillsInView, skillsEntry] = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "-1px 0px -1px 0px",
  });
  const [projectsRef, projectsInView, projectsEntry] = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "-1px 0px -1px 0px",
  });
  const [achievementsRef, achievementsInView, achievementsEntry] = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "-1px 0px -1px 0px",
  });
  const [contactRef, contactInView, contactEntry] = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "-1px 0px -1px 0px",
  });

  // Create an array of section data
  const sections = useMemo(
    () => [
      {
        id: "hero" as SectionId,
        ref: heroRef,
        inView: heroInView,
        intersectionRatio: heroEntry?.intersectionRatio || 0,
      },
      {
        id: "about" as SectionId,
        ref: aboutRef,
        inView: aboutInView,
        intersectionRatio: aboutEntry?.intersectionRatio || 0,
      },
      {
        id: "skills" as SectionId,
        ref: skillsRef,
        inView: skillsInView,
        intersectionRatio: skillsEntry?.intersectionRatio || 0,
      },
      {
        id: "projects" as SectionId,
        ref: projectsRef,
        inView: projectsInView,
        intersectionRatio: projectsEntry?.intersectionRatio || 0,
      },
      {
        id: "achievements" as SectionId,
        ref: achievementsRef,
        inView: achievementsInView,
        intersectionRatio: achievementsEntry?.intersectionRatio || 0,
      },
      {
        id: "contact" as SectionId,
        ref: contactRef,
        inView: contactInView,
        intersectionRatio: contactEntry?.intersectionRatio || 0,
      },
    ],
    [
      heroRef,
      heroInView,
      heroEntry,
      aboutRef,
      aboutInView,
      aboutEntry,
      skillsRef,
      skillsInView,
      skillsEntry,
      projectsRef,
      projectsInView,
      projectsEntry,
      achievementsRef,
      achievementsInView,
      achievementsEntry,
      contactRef,
      contactInView,
      contactEntry,
    ]
  );

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) scrollToSection(hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToSection]);

  // Find the section with the largest intersection ratio
  const activeSection = useMemo(() => {
    return sections.reduce(
      (prev, current) =>
        current.intersectionRatio > prev.intersectionRatio ? current : prev,
      sections[0]
    );
  }, [sections]);

  // Update URL when active section changes
  useEffect(() => {
    if (activeSection) {
      const newUrl = `${window.location.pathname}#${activeSection.id}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [activeSection]);

  return (
    <>
      <NavIndicator
        activeIndex={sections.findIndex(
          (section) => section.id === activeSection.id
        )}
        total={sections.length}
      />
      <main className="flex min-h-screen flex-col items-center justify-between text-white">
        {sections.map(({ id, ref }, index) => {
          const Component = SECTION_COMPONENTS[id];
          return (
            <div
              key={id}
              ref={ref}
              id={id}
              className={`w-full min-h-screen flex flex-col items-center justify-center ${
                index % 2 === 0
                  ? "bg-gradient-to-br from-background2 via-background to-background2"
                  : "bg-gradient-to-br from-background via-background2 to-background"
              } snap-center`}
            >
              <Component />
            </div>
          );
        })}
      </main>
    </>
  );
}
