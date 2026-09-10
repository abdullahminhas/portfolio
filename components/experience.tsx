"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"
import BlurFade from "./ui/blur-fade"

interface ExperienceItem {
  company: string
  role: string
  city: string
  location: string
  link: string
  period: { start: string; end: string }
  status: string
  type: string
  description: string
  tech: readonly string[]
}

interface ExperienceProps {
  experience: readonly ExperienceItem[]
  delay?: number
}

export default function Experience({ experience, delay = 0 }: ExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (experience[index].description) {
      e.preventDefault()
      setExpandedIndex((prev) => (prev === index ? null : index))
    }
  }

  return (
    <div className="relative">
      {/* vertical line */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="absolute top-2 bottom-2 left-2.75 w-px bg-border sm:left-6.75"
      />

      <div className="flex flex-col gap-y-8">
        {experience.map((item, index) => {
          const isExpanded = expandedIndex === index
          return (
            <BlurFade
              key={index}
              delay={delay + index * 0.05}
              className="relative grid grid-cols-[20px_1fr] gap-x-4 sm:grid-cols-[35px_1fr] sm:gap-x-6"
            >
              <span className="absolute left-0 mt-1 -ml-4.5 hidden w-8 text-right text-xs font-medium text-muted-foreground sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative ms-auto mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-secondary">
                <span
                  className={
                    item.status === "Current"
                      ? "size-1.5 rounded-full bg-primary"
                      : "size-1.5 rounded-full bg-muted-foreground"
                  }
                />
              </span>
              <div>
                <h3 className="mb-1 text-sm leading-tight font-semibold text-foreground sm:text-[14.5px]">
                  {item.company}
                </h3>
                <Link
                  href={item.link}
                  className="mt-0.5 flex items-center justify-between gap-2 text-sm text-muted-foreground"
                  onClick={(e) => handleClick(e, index)}
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    {item.role}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span>{item.city}</span>
                    <span className="text-muted-foreground/50">•</span>
                    <span>
                      {item.period.start} – {item.period.end}
                    </span>
                  </div>
                </Link>
                <div className="mt-1.25 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{item.type}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="capitalize">{item.location}</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,

                    height: isExpanded ? "auto" : 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <p className="mt-3 mb-4 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="rounded-full border border-border bg-muted px-3.5 py-2.25 text-[11px] leading-tight font-normal text-foreground/60 hover:bg-muted"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </BlurFade>
          )
        })}
      </div>
    </div>
  )
}
