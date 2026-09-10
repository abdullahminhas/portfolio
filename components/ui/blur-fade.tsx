"use client";

import React, { forwardRef, useRef, useImperativeHandle } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  UseInViewOptions,
  Variants,
  MotionProps,
} from "motion/react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

const BlurFade = forwardRef<HTMLDivElement, BlurFadeProps>(
  (
    {
      children,
      className,
      variant,
      duration = 0.4,
      delay = 0,
      offset = 6,
      direction = "down",
      inView = false,
      inViewMargin = "-50px",
      blur = "6px",
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);

    // Forward internalRef to parent ref
    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const inViewResult = useInView(internalRef, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;

    const defaultVariants: Variants = {
      hidden: {
        [direction === "left" || direction === "right" ? "x" : "y"]:
          direction === "right" || direction === "down" ? -offset : offset,
        opacity: 0,
        filter: `blur(${blur})`,
      },
      visible: {
        [direction === "left" || direction === "right" ? "x" : "y"]: 0,
        opacity: 1,
        filter: `blur(0px)`,
      },
    };

    const combinedVariants = variant || defaultVariants;

    return (
      <AnimatePresence>
        <motion.div
          ref={internalRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit="hidden"
          variants={combinedVariants}
          transition={{
            delay: 0.04 + delay,
            duration,
            ease: "easeOut",
          }}
          className={className}
          {...props}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);

BlurFade.displayName = "BlurFade";

export default BlurFade;
