import React from "react"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Mail,
  Sun,
  ArrowUpRight,
  ArrowRight,
  Icon,
} from "lucide-react"
import Image from "next/image"
import { DATA } from "@/data/resume"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import BlurFade from "@/components/ui/blur-fade"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Experience from "@/components/experience"
import { Education } from "@/components/education"
import { Skills } from "@/components/skills"
import { Certifications } from "@/components/certifications"
import { FluidGradientText } from "@/components/ui/fluid-gradient-text"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { Stats } from "@/components/profile-stats"
import { Testimonials } from "@/components/testimonials"
import Projects from "@/components/projects"
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions"
import { getContributions } from "@/lib/get-cached-contributions"

const BLUR_FADE_DELAY = 0.04
const GITHUB_USERNAME = "abdullahminhas"
const GITHUB_PROFILE_URL = "https://github.com/abdullahminhas"

export default function Hero() {
  const contributions = getContributions(GITHUB_USERNAME)

  return (
    <React.Fragment>
      {/* Hero */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex justify-between gap-2">
            <div className="flex flex-1 flex-col space-y-1.5">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {DATA.name}
                </p>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <p className="max-w-150 md:text-xl">{DATA.summary}</p>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
              <Avatar className="size-37.5 border-2 p-1" title={DATA.name}>
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section>
        <Stats stats={DATA.summaryStats} delay={BLUR_FADE_DELAY * 3} />
      </section>

      {/* About */}
      <BlurFade delay={BLUR_FADE_DELAY * 8}>
        <div className="mt-14 flex items-start gap-6">
          <div className="flex-1">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
                About
              </span>

              <span className="h-px w-16 bg-border" />
            </div>
            <p className="mb-3 w-[85%] text-2xl font-bold tracking-tighter">
              I enjoy turning ideas into real, working products.
            </p>
            <p className="text-sm leading-relaxed text-pretty">
              I enjoy turning ideas into real, working products. I&apos;m
              passionate about web development, continuous learning, and solving
              meaningful problems through technology. When I&apos;m not coding,
              you&apos;ll find me exploring new tools, reading, or staying
              active.
            </p>
          </div>
        </div>
      </BlurFade>

      <section className="my-14">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Experience
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <Experience experience={DATA.experience} delay={BLUR_FADE_DELAY * 9} />
      </section>

      <section className="my-14">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Education
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <Education education={DATA.education} delay={BLUR_FADE_DELAY * 10} />
      </section>
      <section className="my-14">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Certifications
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <Certifications
          certifications={DATA.certifications}
          delay={BLUR_FADE_DELAY * 11}
        />
      </section>
      <section className="mt-14">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Skills
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <Skills skills={DATA.skills} delay={BLUR_FADE_DELAY * 12} />
      </section>
      <section className="mt-14">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Github Contributions
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <GitHubContributions
          contributions={contributions}
          githubProfileUrl={GITHUB_PROFILE_URL}
        />
        </BlurFade>
      </section>
      <section className="mt-14">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Projects
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <div className="flex flex-col gap-8">
          <Projects projects={DATA.projects} BLUR={BLUR_FADE_DELAY * 14} />
        </div>
      </section>
      <section className="mt-14">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Testimonials
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 15 * 1.5}>
          <Testimonials testimonials={DATA.testimonials} />
        </BlurFade>
      </section>
      <section className="mt-14">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Contact
            </span>

            <span className="h-px w-16 bg-border" />
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="sm:max-w-[60%]">
              <p className="mb-3 text-2xl font-bold tracking-tighter sm:text-3xl">
                Let&apos;s make something great.
              </p>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                Have a project in mind, a question, or just want to say hello?
                I&apos;d love to hear from you. Feel free to reach out through
                any of the channels below.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-6 sm:items-center">
              <span className="relative hidden -rotate-12 font-caveat text-2xl text-muted-foreground sm:inline-block">
                {DATA.name.toLowerCase()}
                <svg
                  className="absolute bottom-0 left-0 h-2 w-full"
                  viewBox="0 0 100 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C25 2 55 9 98 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <Button
                asChild
                className="rounded-full bg-foreground px-5 text-background hover:bg-foreground/90"
              >
                <Link
                  href={`mailto:${DATA.contact.email}`}
                  className="flex items-center gap-2"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </BlurFade>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:mt-10 sm:flex sm:flex-row sm:justify-center sm:gap-10">
          {DATA.footer.map((cont, index) => (
            <BlurFade key={index} delay={BLUR_FADE_DELAY * (18 + index)}>
              <div
                className={`flex items-start gap-3 justify-self-center ${index === 0 ? "order-3 col-span-2" : ""} ${index === 1 ? "order-2" : ""} ${index === 2 ? "order-1" : ""} sm:order-none`}
              >
                <cont.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    {cont.label}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {cont.sublabel}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>
      <section className="" id="footer">
        <BlurFade delay={BLUR_FADE_DELAY * 19}>
          <FluidGradientText
            text={DATA.name.split(" ")[0].toLocaleLowerCase()}
          />
          <Separator />
          <div className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-3">
              <Icons.am className="size-4" />
              <h5 className="text-sm font-medium">
                &copy; {new Date().getFullYear()} {DATA.name}.
              </h5>
              <span className="text-xs text-muted-foreground">
                Built with open-source inspiration.
              </span>
            </div>
            <div className="flex flex-row items-center gap-x-2.5">
              {Object.entries(DATA.contact.social)
                .filter(([_, social]) => social.footer)
                .map(([name, social], index, socials) => (
                  <React.Fragment key={name}>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                    >
                      <social.icon className="size-4 text-muted-foreground transition-colors hover:text-primary" />
                    </Link>

                    {index < socials.length - 1 && (
                      <span className="text-xs text-muted-foreground/60">
                        •
                      </span>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </BlurFade>
      </section>
    </React.Fragment>
  )
}
