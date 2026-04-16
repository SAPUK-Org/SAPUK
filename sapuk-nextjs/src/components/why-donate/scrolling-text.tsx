"use client";

import { motion } from "framer-motion";

export default function ScrollingText() {
  return (
    <div className="py-8 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="whitespace-nowrap"
      >
        <span className="text-xl font-bold">
          Thank you for reading and if you require support please click the chat
          icon; Thank you for reading and if you require support please click
          the chat icon; Thank you for reading and if you require support please
          click the chat icon; Thank you for reading and if you require support
          please click the chat icon;
        </span>
      </motion.div>
    </div>
  );
}
