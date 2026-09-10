"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import {
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Hash,
  Link2,
  MapPin,
  Landmark,
  X,
  CircleCheckBig,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { createPortal } from "react-dom"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"
import BlurFade from "./ui/blur-fade"
import { Icons } from "@/components/icons"

const certificationLogos = {
  udemy: Icons.udemy,
  google: Icons.google,
  "circle-check": CircleCheckBig,
} as const

type CertificationLogo = keyof typeof certificationLogos

export type Certification = {
  school: string
  href: string
  title: string
  logo: CertificationLogo
  date: string
  location: string
  credentialId?: string
  credentialUrl?: string
  length?: string
  instructor?: string
}

interface CertificationsProps {
  certifications: readonly Certification[]
  delay?: number
}

export function Certifications({
  certifications,
  delay = 0,
}: CertificationsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const selectedCert =
    selectedIndex !== null ? certifications[selectedIndex] : null

  const goTo = (delta: number) => {
    setSelectedIndex((current) => {
      if (current === null || certifications.length === 0) return current

      return (current + delta + certifications.length) % certifications.length
    })

    setCopied(false)
  }

  useEffect(() => {
    if (!selectedCert) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null)
      }

      if (event.key === "ArrowRight") {
        goTo(1)
      }

      if (event.key === "ArrowLeft") {
        goTo(-1)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCert])

  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      {/* Timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.5 }}
          className="absolute top-2 bottom-2 left-2.75 w-px bg-border sm:left-6.75"
        />

        <div className="flex flex-col gap-y-8">
          {certifications.map((certification, index) => {
            const Logo = certificationLogos[certification.logo]

            return (
              <BlurFade
                key={`${certification.school}-${certification.title}`}
                delay={delay + index * 0.05}
                className="relative grid grid-cols-[20px_1fr] gap-x-4 sm:grid-cols-[35px_1fr] sm:gap-x-6"
              >
                {/* Number */}
                <span className="absolute left-0 mt-1 -ml-4.5 hidden w-8 text-right text-xs font-medium text-muted-foreground sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Timeline dot */}
                <span className="relative z-10 ms-auto mt-1 flex size-4 items-center justify-center rounded-full border bg-secondary">
                  <span className="size-1.5 rounded-full bg-muted-foreground" />
                </span>

                {/* Content */}
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`View ${certification.title} certificate`}
                    className="group flex w-full min-w-0 cursor-pointer items-start justify-between gap-3 text-left"
                  >
                    <div className="flex min-w-0 flex-1 gap-x-4">
                      {/* Logo */}
                      <div className="dark:ring-line flex size-8 shrink-0 items-center justify-center rounded-full border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background select-none sm:size-10">
                        <Logo className="size-4 stroke-[3px]" />
                      </div>

                      {/* Main information */}
                      <div className="min-w-0 flex-1">
                        <h5 className="truncate text-sm font-semibold tracking-[-0.01em] text-foreground">
                          {certification.title}
                        </h5>

                        <div className="mt-0.5 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                          <span className="truncate">
                            {certification.school}
                          </span>

                          {certification.date && (
                            <>
                              <span
                                aria-hidden="true"
                                className="shrink-0 text-muted-foreground/50"
                              >
                                •
                              </span>
                              <span className="shrink-0 tabular-nums">
                                {certification.date}
                              </span>
                            </>
                          )}

                          {certification.location && (
                            <>
                              <span
                                aria-hidden="true"
                                className="shrink-0 text-muted-foreground/50"
                              >
                                •
                              </span>
                              <span className="truncate">
                                {certification.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <ArrowUpRight className="mt-1 ml-2 size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                </div>
              </BlurFade>
            )
          })}
        </div>
      </div>

      {/* Certificate modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedCert.title} certificate preview`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 p-4 backdrop-blur-sm sm:p-8"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    setSelectedIndex(null)
                  }
                }}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
                >
                  {/* Header */}
                  <div className="relative flex items-start justify-between gap-4 px-6 pt-5 sm:px-8 sm:pt-6">
                    <div className="pointer-events-none absolute inset-x-0 top-full z-10 h-16 w-full bg-background backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] md:hidden" />

                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {selectedCert.title}
                      </h2>

                      <div className="mt-2 flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50">
                          {(() => {
                            const SelectedLogo =
                              certificationLogos[selectedCert.logo]

                            return (
                              <SelectedLogo className="size-3.5 stroke-[3px]" />
                            )
                          })()}
                        </span>

                        <span className="truncate font-medium">
                          {selectedCert.school}
                        </span>

                        {selectedCert.instructor && (
                          <>
                            <span aria-hidden="true">•</span>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="max-w-48 cursor-help truncate">
                                  {selectedCert.instructor}
                                </span>
                              </TooltipTrigger>

                              <TooltipContent>
                                Instructor {selectedCert.instructor}
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      size="icon"
                      variant="ghost"
                      aria-label="Close certificate preview"
                      className="shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>

                  {/* Body */}
                  <div className="grid max-h-[calc(90dvh-2rem)] grid-cols-1 gap-6 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-[1fr_320px] md:gap-8">
                    {/* Preview */}
                    <div className="relative flex flex-col items-center">
                      <div className="relative flex w-full items-center justify-center">
                        {certifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => goTo(-1)}
                            aria-label="Previous certificate"
                            className="absolute top-1/2 -left-4 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-sm transition hover:bg-muted sm:-left-6"
                          >
                            <span className="sr-only">Previous</span>

                            <svg
                              viewBox="0 0 24 24"
                              className="size-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                        )}

                        <div className="w-full overflow-hidden rounded-xl border bg-muted py-1.5">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedCert.href}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Image
                                src={selectedCert.href}
                                alt={`${selectedCert.title} certificate`}
                                width={1600}
                                height={1200}
                                sizes="(max-width: 768px) calc(100vw - 3rem), 640px"
                                className="max-h-[55vh] w-full !rounded-xl object-contain"
                                priority
                                unoptimized
                              />
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {certifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => goTo(1)}
                            aria-label="Next certificate"
                            className="absolute top-1/2 -right-4 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-sm transition hover:bg-muted sm:-right-6"
                          >
                            <span className="sr-only">Next</span>

                            <svg
                              viewBox="0 0 24 24"
                              className="size-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path d="M9 6l6 6-6 6" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {certifications.length > 1 && selectedIndex !== null && (
                        <div className="mt-5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                          {selectedIndex + 1} / {certifications.length}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-full border bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background">
                          <Landmark className="size-4" />
                        </span>

                        <h3 className="text-lg font-semibold text-foreground">
                          Certificate Details
                        </h3>
                      </div>

                      <div className="mb-2 border-t" />

                      <dl className="flex h-full flex-col">
                        <DetailRow
                          icon={(() => {
                            const SelectedLogo =
                              certificationLogos[selectedCert.logo]

                            return (
                              <SelectedLogo className="size-4 stroke-[3px]" />
                            )
                          })()}
                          label="Provider"
                        >
                          {selectedCert.school}
                        </DetailRow>

                        {selectedCert.date && (
                          <DetailRow
                            icon={<Calendar className="size-4" />}
                            label="Issued"
                          >
                            {selectedCert.date}
                          </DetailRow>
                        )}

                        {selectedCert.location && (
                          <DetailRow
                            icon={<MapPin className="size-4" />}
                            label="Location"
                          >
                            {selectedCert.location}
                          </DetailRow>
                        )}

                        {selectedCert.instructor && (
                          <DetailRow
                            icon={<Landmark className="size-4" />}
                            label="Instructor"
                          >
                            {selectedCert.instructor}
                          </DetailRow>
                        )}

                        {selectedCert.length && (
                          <DetailRow
                            icon={<Clock className="size-4" />}
                            label="Length"
                          >
                            {selectedCert.length}
                          </DetailRow>
                        )}

                        {selectedCert.credentialId && (
                          <DetailRow
                            icon={<Hash className="size-4" />}
                            label="Credential ID"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="min-w-0 break-all">
                                {selectedCert.credentialId}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(selectedCert.credentialId!)
                                }
                                aria-label="Copy credential ID"
                                className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground"
                              >
                                {copied ? (
                                  <Check className="size-3.5" />
                                ) : (
                                  <Copy className="size-3.5" />
                                )}
                              </button>
                            </div>
                          </DetailRow>
                        )}

                        {selectedCert.credentialUrl && (
                          <DetailRow
                            icon={<Link2 className="size-4" />}
                            label="Credential URL"
                          >
                            <a
                              href={selectedCert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="group flex min-w-0 items-start gap-1 text-foreground underline-offset-2 hover:underline"
                            >
                              <span className="min-w-0 truncate break-all">
                                {selectedCert.credentialUrl}
                              </span>

                              <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                            </a>
                          </DetailRow>
                        )}
                      </dl>

                      {/* Actions */}
                      <div className="mt-auto flex gap-2 pt-4">
                        <Button asChild className="flex-1 gap-2">
                          <a href={selectedCert.href} download>
                            Download
                          </a>
                        </Button>

                        {selectedCert.credentialUrl && (
                          <Button
                            asChild
                            variant="outline"
                            className="flex-1 gap-2"
                          >
                            <a
                              href={selectedCert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink className="size-4" />
                              Open Credential
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 py-3 text-sm">
      <span className="dark:ring-line flex size-6 shrink-0 items-center justify-center self-center rounded-full border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background select-none sm:size-8 sm:self-start">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>

        <div className="mt-0.5 font-medium text-foreground">{children}</div>
      </div>
    </div>
  )
}
