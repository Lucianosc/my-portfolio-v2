import { useState, useEffect, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  normalizedX: number;
  normalizedY: number;
  isInside: boolean;
}

export function useMousePosition(
  elementRef: RefObject<HTMLElement | null>
): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInside: false,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const element = elementRef.current;

      if (!element) {
        setMousePosition({
          x: clientX,
          y: clientY,
          elementX: 0,
          elementY: 0,
          normalizedX: 0,
          normalizedY: 0,
          isInside: false,
        });
        return;
      }

      const rect = element.getBoundingClientRect();
      const elementX = clientX - rect.left;
      const elementY = clientY - rect.top;
      const isInside =
        elementX >= 0 &&
        elementX <= rect.width &&
        elementY >= 0 &&
        elementY <= rect.height;

      setMousePosition({
        x: clientX,
        y: clientY,
        elementX: isInside ? elementX : 0,
        elementY: isInside ? elementY : 0,
        normalizedX: isInside ? elementX / rect.width : 0,
        normalizedY: isInside ? elementY / rect.height : 0,
        isInside,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [elementRef]);

  return mousePosition;
}

