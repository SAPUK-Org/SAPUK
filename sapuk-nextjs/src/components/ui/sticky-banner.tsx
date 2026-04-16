"use client";

import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
}: {
  className?: string;
  children: React.ReactNode;
  hideOnScroll?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  const [manuallyClosed, setManuallyClosed] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
    if (hideOnScroll && !manuallyClosed) {
      if (latest > 40) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  });

  const handleClose = () => {
    setOpen(false);
    setManuallyClosed(true);
  };

  return (
    <motion.div
      className="overflow-hidden w-full max-w-full"
      initial={{ height: 56 }}
      animate={{ height: open ? 56 : 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div
        className={cn(
          "sticky top-0 z-30 flex min-h-14 w-full max-w-full items-center justify-center bg-transparent px-4 py-1",
          className
        )}
      >
        {children}

        <motion.button
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          className="absolute top-1/2 right-1 sm:right-2 md:right-4 lg:right-6 -translate-y-1/2 cursor-pointer hover:bg-zinc-100/30 rounded-full p-1"
          onClick={handleClose}
        >
          <X className="h-5 w-5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};
