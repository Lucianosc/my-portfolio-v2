import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/constants/constants";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useDragToDismiss } from "@/hooks/useDragToDismiss";

type ItemProps = (typeof PROJECTS)[number] & {
  onClose: () => void;
};

export function ShownItem({
  imageUri,
  title,
  description,
  url,
  id,
  onClose,
}: ItemProps) {
  const { isDragging, dragHandlers, dragProps } = useDragToDismiss({
    onDismiss: onClose,
    threshold: 100,
    animationDuration: 0.5,
    springConfig: {
      stiffness: 300,
      damping: 30,
    },
  });

  // Only lock scroll when not dragging
  useScrollLock({ enabled: !isDragging });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-10 overscroll-none"
        onClick={onClose}
      />
      <div className="fixed inset-0 items-center justify-center top-0 z-20 w-full h-full flex">
        <div className="relative py-10 w-full p-4">
          <motion.div
            className="relative rounded-2xl bg-background2 overflow-hidden max-w-[820px] mx-auto h-full"
            layoutId={`card-container-${id}`}
            {...dragProps}
            {...dragHandlers}
          >
            <motion.div
              className="relative top-0 left-0 overflow-hidden h-64 sm:h-80 md:h-96 w-screen bp820:w-[820px] z-60"
              layoutId={`card-image-container-${id}`}
            >
              <Image
                src={imageUri}
                alt={title}
                fill
                className="object-cover"
                priority
                draggable={false}
              />
            </motion.div>
            <motion.div
              className="relative p-4 sm:p-8 max-w-[820px] flex flex-col gap-4 z-55"
              animate
            >
              <h2 className="text-white mb-2">{title}</h2>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 flex items-center gap-2 w-fit"
              >
                <ExternalLink className="h-4 w-4" />
                View Live Project
              </a>
              <p className="text-muted-foreground text-lg">{description}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
