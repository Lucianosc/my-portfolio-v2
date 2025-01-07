import { useAnimation, PanInfo } from "framer-motion";
import { useState } from "react";

interface UseDragToDismissProps {
  onDismiss: () => void;
  threshold?: number;
  animationDuration?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
  };
}

interface DragToDismissResult {
  dragControls: ReturnType<typeof useAnimation>;
  dragHandlers: {
    onDragStart: () => void;
    onDragEnd: (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => void;
  };
  isDragging: boolean;
  dragProps: {
    drag: boolean;
    dragDirectionLock?: boolean;
    dragElastic: number;
    dragMomentum: boolean;
    dragConstraints: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    animate: ReturnType<typeof useAnimation>;
    style: { touchAction: "none" };
  };
}

export function useDragToDismiss({
  onDismiss,
  threshold = 100,
  animationDuration = 0.5,
  springConfig = {
    stiffness: 300,
    damping: 30,
  },
}: UseDragToDismissProps): DragToDismissResult {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    const xOffset = Math.abs(info.offset.x);
    const yOffset = Math.abs(info.offset.y);

    if (xOffset > threshold || yOffset > threshold) {
      await controls.start({
        transition: { duration: animationDuration },
      });
      onDismiss();
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          ...springConfig,
        },
      });
    }
  };

  const dragProps = {
    drag: true,
    dragElastic: 1, // No resistance
    dragMomentum: false, // No momentum/bounce effect
    dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
    animate: controls,
    style: { touchAction: "none" as const },
  };

  return {
    dragControls: controls,
    dragHandlers: {
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
    },
    isDragging,
    dragProps,
  };
}
