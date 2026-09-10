"use client";

import * as React from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useTheme } from "next-themes";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof AnimatedThemeToggler>
>((props, ref) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <AnimatedThemeToggler
      ref={ref}
      className="size-12 rounded-full p-0"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      {...props}
    />
  );
});

ModeToggle.displayName = "ModeToggle";
