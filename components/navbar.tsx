"use client"
import { useState, useEffect } from "react"
import { Dock, DockIcon } from "@/components/ui/dock"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DATA } from "@/data/resume"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BlurFade from "./ui/blur-fade"

export default function Navbar() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      const footer = document.getElementById("footer")

      if (!footer) return

      const footerTop = footer.getBoundingClientRect().top
      const footerVisible = footerTop <= window.innerHeight - 80

      if (footerVisible) {
        setHidden(true)
      } else if (currentScrollY < lastScrollY) {
        setHidden(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-10 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom",
        "transition-transform duration-300 ease-out",
        hidden && "translate-y-[calc(100%+1rem)]"
      )}
    >
      <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-secondary to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"></div>
      {mounted && (
        <BlurFade className="mx-auto">
          <Dock className="pointer-events-auto relative z-50 flex h-full min-h-full transform-gpu items-center bg-secondary px-1 dark:[border:1px_solid_rgba(255,255,255,.1)]">
            {/* [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] */}
            {DATA.navbar
              .filter((item) => !(item.href === "/" && pathname === "/"))
              .map((item) => (
                <DockIcon key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12"
                        )}
                        target={item.label === "Home" ? undefined : "_blank"}
                      >
                        <item.icon className="size-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}
            <Separator orientation="vertical" className="h-full" />
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <DockIcon key={name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.url}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12"
                        )}
                      >
                        <social.icon className="size-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}
            <Separator orientation="vertical" className="h-full py-2" />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </BlurFade>
      )}
    </div>
  )
}
