import { Geist, Geist_Mono, Caveat } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/ui/dot-pattern"
import { TooltipProvider } from "@/components/ui/tooltip"
import Navbar from "@/components/navbar"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geist.variable,
        geistMono.variable,
        caveat.variable,
        "font-sans"
      )}
    >
      <body className="relative min-h-screen bg-secondary font-sans antialiased selection:bg-primary selection:text-white dark:selection:bg-primary dark:selection:text-black">
        <div className="absolute inset-0 top-0 right-0 left-0 z-0 h-87.5 overflow-hidden">
          <DotPattern
            cx={1}
            cy={1}
            cr={1}
            className="h-full w-full"
            style={{
              maskImage: `
                linear-gradient(to bottom, black, transparent),
                linear-gradient(to right, black 0%, black 65%, transparent 100%)
              `,
              WebkitMaskImage: `
                linear-gradient(to bottom, black, transparent),
                linear-gradient(to left, black 0%, black 5%, transparent 100%)
              `,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </div>

        <ThemeProvider>
          <TooltipProvider>
            <div className="relative z-10 mx-auto max-w-2xl px-6 pt-12 pb-0 sm:pt-24">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
