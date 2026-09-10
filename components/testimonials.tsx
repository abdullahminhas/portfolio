"use client"

import * as React from "react"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TestimonialAuthor {
  name: string
  rating: number
  designation?: string
  avatar: {
    src: string
    alt: string
  }
}

interface TestimonialItem {
  quote: string
  platform?: string
  link?: string
  author: TestimonialAuthor
}

interface TestimonialsProps {
  testimonials: readonly TestimonialItem[]
}

function formatAuthorName(name: string) {
  return name.replace(/_/g, " ")
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const autoplay = React.useRef(
    Autoplay({ delay: 7500, stopOnInteraction: true })
  )

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())
    const onSelect = () => setCurrent(api.selectedScrollSnap())

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <TooltipProvider delayDuration={200}>
      {/* Carousel */}
      <div className="relative mt-10 sm:mt-14">
        {/* <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous testimonial"
            className="absolute left-1 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background text-foreground shadow-sm transition hover:bg-muted sm:-left-2 sm:size-11 md:-left-5"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next testimonial"
            className="absolute right-1 top-1/2 z-10 flex size-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border bg-background text-foreground shadow-sm transition hover:bg-muted sm:-right-2 sm:size-11 md:-right-5"
          >
            <ChevronRight className="size-4" />
          </button> */}

        <Carousel setApi={setApi} plugins={[autoplay.current]}>
          <CarouselContent>
            {testimonials.map((testimonial, id) => (
              <CarouselItem key={id}>
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Dots */}
      {/* <div className="mt-6 flex items-center justify-center gap-1.5">
          {testimonials.map((_, id) => (
            <button
              key={id}
              type="button"
              aria-label={`Go to testimonial ${id + 1}`}
              onClick={() => api?.scrollTo(id)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                current === id
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div> */}

      {/* Avatar picker */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {testimonials.map((testimonial, id) => (
          <button
            key={id}
            type="button"
            aria-label={`Show testimonial from ${formatAuthorName(
              testimonial.author.name
            )}`}
            onClick={() => api?.scrollTo(id)}
          >
            <Avatar
              className={cn(
                "transition-all duration-200",
                current === id
                  ? "size-9 ring-2 ring-muted-foreground ring-offset-2 ring-offset-background sm:size-10"
                  : "size-9 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 sm:size-10"
              )}
            >
              <AvatarImage
                src={testimonial.author.avatar.src}
                alt={testimonial.author.avatar.alt}
              />
              <AvatarFallback>
                {formatAuthorName(testimonial.author.name).slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </button>
        ))}
      </div>
    </TooltipProvider>
  )
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  const { quote, author, link, platform } = testimonial
  const displayName = formatAuthorName(author.name)

  const card = (
    <div className="px-6 py-4 sm:px-10 sm:py-6">
      <Quote className="size-8 fill-muted-foreground/15 text-muted-foreground/15" />

      <p className="mt-6 text-sm leading-relaxed text-foreground sm:mt-7 sm:text-base">
        {quote}
      </p>

      <div className="mt-8 sm:mt-10">
        <div className="mb-5 h-px w-10 bg-border" />
        <div className="flex items-center gap-3">
          <Avatar className="size-12 sm:size-14">
            <AvatarImage src={author.avatar.src} alt={author.avatar.alt} />
            <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground capitalize">
              {displayName}
            </p>
            {author.rating > 0 && (
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: author.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-foreground text-foreground"
                  />
                ))}
              </div>
            )}
            {author.designation ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {author.designation}
              </p>
            ) : platform ? (
              <p className="mt-1 text-sm text-muted-foreground">{platform}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )

  if (!link) return card

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label={platform ? `Read on ${platform}` : undefined}
          className="block"
        >
          {card}
        </Link>
      </TooltipTrigger>
      {platform && (
        <TooltipContent>
          <p>{platform}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}
