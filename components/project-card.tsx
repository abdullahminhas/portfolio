import { Badge } from "@/components/ui/badge"
import React from "react"
import { CardTitle } from "./ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Separator } from "./ui/separator"
import Markdown from "react-markdown"
import Image from "next/image"

interface Props {
  index: number
  title: string
  href?: string
  description: string
  dates?: string
  technologies: readonly string[]
  link?: string
  image?: string
  video?: string
  links?: readonly {
    icon: React.ReactNode
    type: string
    href: string
  }[]
  className?: string
}

export function ProjectCard({
  index,
  title,
  href,
  description,
  dates,
  technologies,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div className="group">
      {/* index + external link */}
      <div className="mb-4 flex w-full items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Separator className="flex-1" />
        <Link
          href={href || link || "#"}
          target="_blank"
          className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-x-6 gap-y-3 sm:flex-row">
        {/* thumbnail */}
        <Link
          href={href || "#"}
          className={cn(
            "block aspect-video max-h-fit w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-72",
            className
          )}
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none h-auto w-full object-cover object-top"
            />
          )}
          {image && !video && (
            <img
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-auto w-full object-cover object-top"
            />
          )}
        </Link>

        {/* content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {dates && (
            <time className="mt-1 font-sans text-xs text-muted-foreground">
              {dates}
            </time>
          )}

          {technologies && technologies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          <div className="prose dark:prose-invert mt-3 line-clamp-2 max-w-full text-[13px] text-pretty text-muted-foreground">
            <Markdown>{description}</Markdown>
          </div>

          {links && links.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {links.map((link, idx) => (
                <React.Fragment key={idx}>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.icon}
                    <span className="text-xs font-medium">{link.type}</span>
                  </Link>
                  {links.length > 1 && idx < links.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-muted-foreground/50"
                    >
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
