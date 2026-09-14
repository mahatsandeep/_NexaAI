"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    className: "top-[-10%] left-[10%] h-72 w-72 bg-primary/25",
    animate: { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
    duration: 18,
  },
  {
    className: "top-[10%] right-[5%] h-96 w-96 bg-accent/40",
    animate: { x: [0, -50, 30, 0], y: [0, 30, -20, 0] },
    duration: 22,
  },
  {
    className: "bottom-[-15%] left-[35%] h-80 w-80 bg-primary/15",
    animate: { x: [0, 30, -40, 0], y: [0, -20, 30, 0] },
    duration: 26,
  },
];

export function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
