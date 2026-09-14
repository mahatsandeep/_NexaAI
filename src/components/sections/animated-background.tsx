"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    className: "top-[-12%] left-[6%] h-[26rem] w-[26rem] bg-[#7c9bff]",
    animate: { x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] },
    duration: 16,
  },
  {
    className: "top-[5%] right-[2%] h-[24rem] w-[24rem] bg-[#8b7bff]",
    animate: { x: [0, -60, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.95, 1.08, 1] },
    duration: 20,
  },
  {
    className: "bottom-[-18%] left-[30%] h-[22rem] w-[22rem] bg-[#ff8fd6]",
    animate: { x: [0, 40, -50, 0], y: [0, -30, 40, 0], scale: [1, 1.08, 0.92, 1] },
    duration: 24,
  },
];

export function AnimatedBackground({
  opacity = "opacity-25",
}: {
  opacity?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${opacity}`}
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
