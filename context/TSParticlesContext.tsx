"use client";

import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TSParticlesContextType = { isEngineInit: boolean };

const TSParticlesContext = createContext<TSParticlesContextType | undefined>(
  undefined
);

export function TSParticlesProvider({ children }: { children: ReactNode }) {
  const [isEngineInit, setIsEngineInit] = useState(false);

  useEffect(() => {
    const initEngine = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setIsEngineInit(true);
    };

    initEngine();
  }, []);

  return (
    <TSParticlesContext.Provider value={{isEngineInit}}>
      {children}
    </TSParticlesContext.Provider>
  );
}

export function useTSParticles() {
  const context = useContext(TSParticlesContext);
  if (context === undefined) {
    throw new Error("useTSParticles must be used within a TSParticlesProvider");
  }
  return context;
}
