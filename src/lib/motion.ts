import type { Variants } from "framer-motion";

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const revealViewport = { once: true, amount: 0.15 } as const;

export function staggerDelay(i: number, step = 0.08) {
  return { transition: { delay: i * step, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } };
}
