import BlurFade from "@/components/ui/blur-fade"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SummaryStat {
  label: string
  value: string
}

interface StatsProps {
  stats: readonly SummaryStat[]
  delay?: number
}

export function Stats({ stats, delay = 0 }: StatsProps) {
  function getCurrentTime(gmtOffset: string = "GMT+1"): string {
    const match = gmtOffset.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/i)

    if (!match) return ""

    const sign = match[1] === "+" ? 1 : -1
    const hours = Number(match[2])
    const minutes = Number(match[3] ?? 0)

    const offset = sign * (hours * 60 + minutes)

    const now = new Date()
    const timezoneTime = new Date(now.getTime() + offset * 60 * 1000)

    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }).format(timezoneTime)
  }

  function getTimeDifference(gmtOffset: string = "GMT+1"): string {
    const match = gmtOffset.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/i)

    if (!match) return "Invalid timezone"

    const sign = match[1] === "+" ? 1 : -1
    const hours = Number(match[2])
    const minutes = Number(match[3] ?? 0)

    const configuredOffset = sign * (hours * 60 + minutes)

    const now = new Date()
    const visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: visitorTimezone,
      timeZoneName: "longOffset",
    }).formatToParts(now)

    const offsetString = parts.find(
      (part) => part.type === "timeZoneName"
    )?.value

    if (!offsetString) return "Unable to detect timezone"

    const visitorMatch = offsetString.match(
      /^GMT([+-])(\d{1,2})(?::(\d{2}))?$/i
    )

    if (!visitorMatch) return "Unable to detect timezone"

    const visitorSign = visitorMatch[1] === "+" ? 1 : -1
    const visitorHours = Number(visitorMatch[2])
    const visitorMinutes = Number(visitorMatch[3] ?? 0)

    const visitorOffset = visitorSign * (visitorHours * 60 + visitorMinutes)

    const difference = visitorOffset - configuredOffset

    if (difference === 0) {
      return "Same time as you"
    }

    const absoluteDifference = Math.abs(difference)
    const hoursDifference = Math.floor(absoluteDifference / 60)
    const minutesDifference = absoluteDifference % 60

    const amount =
      minutesDifference === 0
        ? `${hoursDifference}H`
        : `${hoursDifference}H ${minutesDifference}M`

    return difference > 0
      ? `You are ${amount} ahead of me`
      : `You are ${amount} behind me`
  }

  return (
    <div className="mt-14">
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <BlurFade
            key={index}
            delay={delay + index * 0.05}
            className="border-border p-4 not-nth-[2n+1]:border-l nth-[n+3]:border-t sm:not-nth-[2n+1]:border-l-0 sm:not-nth-[3n+1]:border-l sm:nth-[n+3]:border-t-0 sm:nth-[n+4]:border-t"
          >
            <span className="mb-1 block text-xs text-muted-foreground/70">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="mb-1 block text-[11px] font-medium tracking-wider text-muted-foreground/70">
              {stat.label.toUpperCase()}
            </span>

            <span className="truncate text-sm text-foreground">
              {stat.label === "LOCAL TIME" ? (
                <Tooltip>
                  <TooltipTrigger>
                    {getCurrentTime(stat.value)}, {stat.value}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getTimeDifference(stat.value)}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                stat.value
              )}
            </span>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}
