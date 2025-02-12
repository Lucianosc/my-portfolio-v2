import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
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
  techsUsed,
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
  useScrollLock({
    enabled: !isDragging,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-10 items-center justify-center top-0 w-full flex"
        onClick={onClose}
      >
        <div className="relative px-4" style={{ maxWidth: "820px" }}>
          <motion.div
            className="relative rounded-2xl bg-background2 overflow-hidden mx-auto"
            layoutId={`card-container-${id}`}
            layout
            {...dragProps}
            {...dragHandlers}
            // onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-background2/80 hover:bg-background2/60 transition-colors z-10"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <motion.div
              className="relative z-60 aspect-[2048/1230]"
              layoutId={`card-image-container-${id}`}
              layout
            >
              <Image
                src={imageUri}
                alt={title}
                fill
                className="object-cover"
                priority
                draggable={false}
              />
              <motion.div
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              >
                <motion.div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div className="flex flex-wrap gap-2">
                    {techsUsed.map((tech) => (
                      <span
                        key={tech + "_" + id}
                        className="px-3 py-1 bg-background/80 rounded-full text-white text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative p-4 sm:p-8 flex flex-col gap-4 z-55 display-block"
              animate
              layout
            >
              <div className="flex w-full justify-between">
                <h2 className="text-white mb-2">{title}</h2>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 flex items-center gap-2 w-fit"
                >
                  Check website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-muted-foreground text-lg">{description}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
