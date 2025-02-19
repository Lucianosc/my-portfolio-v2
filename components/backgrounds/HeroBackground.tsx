"use client";

import React from "react";
import Particles from "@tsparticles/react";

import type { Container } from "@tsparticles/engine";
import { heroBackgroundOptions } from "@/constants/tsParticlesOptions";
import { useTSParticles } from "@/context/TSParticlesContext";

const ParticlesImageMask = () => {
  const { isEngineInit } = useTSParticles();

  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (!container) throw new Error("Container not found");
  };

  return (
    <>
      {isEngineInit && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={heroBackgroundOptions}
        />
      )}
    </>
  );
};

export default ParticlesImageMask;
