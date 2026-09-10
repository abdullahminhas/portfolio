import React from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import BlurFade from "./ui/blur-fade"
import { cn } from "@/lib/utils"

type SkillItem = {
  name: string
  icon: React.ComponentType<{ className?: string }>
}

type SkillCategory = {
  category: string
  label: string
  items: readonly SkillItem[]
}

interface SkillsProps {
  skills: readonly SkillCategory[]
  delay?: number
}

export function Skills({ skills, delay = 0 }: SkillsProps) {
  return (
    <div>
      {/* delay * 10 + index * 0.05 */}
      {skills.map((skill, index) => (
        <BlurFade
          delay={delay + index * 0.05}
          key={index}
          className="border-b border-border last:border-b-0"
        >
          <div className="flex flex-col sm:flex-row">
            <div
              className={cn(
                "flex w-full items-center gap-x-4 ps-0 pe-6 pt-4 pb-2 sm:w-[35%] sm:py-4",
                index === 0 && "pt-0 sm:pt-0"
              )}
            >
              <span className="hidden w-8 text-right text-xs font-medium text-muted-foreground sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h5 className="text-sm font-semibold tracking-[-0.01em] text-foreground">{skill.category}</h5>
                <span className="block text-xs leading-4 text-muted-foreground">
                  {skill.label}
                </span>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-auto sm:block"
            />
            <div
              className={cn(
                "flex items-center gap-x-4 pe-0 pb-4 sm:w-[65%] sm:py-4 sm:ps-6",
                index === 0 && "pt-0 sm:pt-0"
              )}
            >
              <span className="invisible mr-1.5 text-lg select-none sm:hidden">
                0{index + 1}
              </span>
              <div className="flex w-full flex-row flex-wrap items-center gap-2">
                {skill.items.map((Item, index) => (
                  <Badge className="gap-x-1.5 align-middle text-xs py-2!" variant="outline" key={index}>
                    <Item.icon className="size-3" />
                    {Item.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      ))}
    </div>
  )
}
