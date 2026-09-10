"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BlurFade from "./ui/blur-fade"
import { CalendarIcon, ChevronRightIcon, MapPin } from "lucide-react"
import { motion } from "motion/react"

type Education = {
  school: string
  degree: string
  start: string
  end: string
  city: string
  logoUrl: string
}

interface EducationProps {
  education: readonly Education[]
  delay?: number
}

export function Education({ education, delay = 0 }: EducationProps) {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="absolute top-2 bottom-2 left-2.75 w-px bg-border sm:left-6.75"
      />

      <div className="flex flex-col gap-y-8">
        {education.map((education, index) => (
          <BlurFade key={education.school} delay={delay + index * 0.05}>
            <div className="group relative grid min-w-0 grid-cols-[20px_1fr] gap-x-4 sm:grid-cols-[35px_1fr] sm:gap-x-6">
              {/* Number */}
              <span className="absolute left-0 mt-1 -ml-4.5 hidden w-8 text-right text-xs font-medium text-muted-foreground sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Timeline dot */}
              <span className="relative z-10 ms-auto mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border bg-secondary">
                <span className="size-1.5 rounded-full bg-muted-foreground" />
              </span>

              {/* Content */}
              <div className="flex min-w-0 flex-1 gap-x-4">
                <Avatar className="bg-muted-background size-8 shrink-0 border border-border ring-1 ring-border/50 ring-offset-1 ring-offset-background sm:size-12 dark:bg-foreground">
                  <AvatarImage
                    src={education.logoUrl}
                    alt={education.school}
                    className="object-contain p-0.5"
                  />
                  <AvatarFallback>{education.school[0]}</AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-1 flex-col gap-y-1.5 sm:flex-row sm:justify-between">
                  <div className="flex min-w-0 flex-col gap-y-1.5">
                    <div className="flex min-w-0 items-center gap-x-2">
                      <h5 className="min-w-0 truncate text-sm font-semibold">
                        {education.school}
                      </h5>

                      <ChevronRightIcon className="size-4 shrink-0 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                    </div>

                    <div className="max-w-full min-w-0 truncate text-xs font-medium text-muted-foreground tabular-nums">
                      <span className="block truncate">{education.degree}</span>
                    </div>

                    <div className="flex items-center gap-x-1.5 text-[11px] font-normal text-muted-foreground tabular-nums">
                      <CalendarIcon className="size-3 shrink-0" />
                      <span className="shrink-0">
                        {education.start} - {education.end}
                      </span>
                    </div>
                  </div>

                  <div className="flex max-w-full min-w-0 items-center gap-x-1.5 text-xs text-muted-foreground tabular-nums sm:max-w-[40%] sm:font-medium">
                    <MapPin className="size-3 shrink-0 sm:hidden" />
                    <span className="min-w-0 truncate">{education.city}</span>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}
