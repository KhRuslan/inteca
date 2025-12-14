import { useEffect, useState } from "react"
import { CheckSquare, ArrowLeftRight, Users } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"

/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    setReduced(mq.matches)
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return reduced
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim()
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  )
  if (!m) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 }
  }
  const [, prefix, num, suffix] = m
  const normalized = num.replace(/,/g, "")
  const end = parseFloat(normalized)
  const decimals = (normalized.split(".")[1]?.length ?? 0)
  return {
    prefix: prefix ?? "",
    end: isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  }
}

/** Small component: one animated metric */
function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string
  label: string
  sub?: string
  duration?: number
}) {
  const reduceMotion = usePrefersReducedMotion()
  const { prefix, end, suffix, decimals } = parseMetricValue(value)
  const [CountUpComponent, setCountUpComponent] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    import('react-countup').then((module) => {
      setCountUpComponent(() => module.default)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    const element = document.getElementById(`metric-${label}`)
    if (element) {
      observer.observe(element)
    }
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [label])

  return (
    <div id={`metric-${label}`} className="flex flex-col gap-2 text-left p-6">
      <p
        className="text-2xl font-medium text-white sm:text-4xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion || !CountUpComponent || !isVisible ? (
          <span>
            {end.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
          </span>
        ) : (
          <CountUpComponent
            end={end}
            decimals={decimals}
            duration={duration}
            separator=","
          />
        )}
        {suffix}
      </p>
      <p className="font-medium text-white text-left">
        {label}
      </p>
      {sub ? (
        <p className="text-white text-opacity-80 text-left">{sub}</p>
      ) : null}
    </div>
  )
}

interface BusinessResult {
  id: number
  title: string
  description: string
  icon?: 'check' | 'arrow' | 'users'
  metrics: Array<{
    value: string
    label: string
    sub?: string
  }>
}

interface BusinessResultsProps {
  title?: string
  results?: BusinessResult[]
}

export default function BusinessResults({ 
  title = "Business Results",
  results 
}: BusinessResultsProps) {
  const { language } = useLanguage()

  // Локализация заголовков
  const getLocalizedTitle = (titleKey: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'Strategic': {
        ru: 'Стратегическое',
        kz: 'Стратегиялық',
        en: 'Strategic'
      },
      'Decision-Making': {
        ru: 'Принятие решений',
        kz: 'Шешім қабылдау',
        en: 'Decision-Making'
      },
      'Leadership': {
        ru: 'Лидерство',
        kz: 'Көшбасшылық',
        en: 'Leadership'
      }
    }
    return translations[titleKey]?.[language] || titleKey
  }

  const defaultResults: BusinessResult[] = [
    {
      id: 1,
      title: "Strategic",
      description: "Participants improve their ability to think beyond short-term execution. They gain a clearer strategic vision, understand consequences, and align decisions with long-term business goals.",
      icon: 'check',
      metrics: [
        { value: "95%", label: "Strategic Vision", sub: "Long-term thinking improvement" },
        { value: "3.2x", label: "Decision Quality", sub: "Better alignment with goals" },
      ],
    },
    {
      id: 2,
      title: "Decision-Making",
      description: "Managers develop confidence and structure in decision-making by practicing real-world business scenarios. They learn to analyze complexity, assess risks, and justify decisions under pressure.",
      icon: 'arrow',
      metrics: [
        { value: "88%", label: "Confidence Gain", sub: "In decision-making" },
        { value: "2.5x", label: "Risk Assessment", sub: "Improved analysis skills" },
      ],
    },
    {
      id: 3,
      title: "Leadership",
      description: "Case discussions strengthen leadership presence, accountability, and cross-team collaboration. Managers communicate more clearly, engage teams effectively, and reduce strategic and operational mistakes.",
      icon: 'users',
      metrics: [
        { value: "92%", label: "Team Engagement", sub: "Improved collaboration" },
        { value: "70%", label: "Error Reduction", sub: "Fewer strategic mistakes" },
      ],
    },
  ]

  const displayResults = (results || defaultResults).map(result => ({
    ...result,
    title: getLocalizedTitle(result.title)
  }))

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-white"
      aria-labelledby="business-results-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h2
              id="business-results-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 relative inline-block"
            >
              <span className="absolute -top-6 sm:-top-8 left-0 w-full h-0.5 bg-[#DD0000]"></span>
              {title}
            </h2>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {displayResults.map((result, idx) => {
              const reversed = idx % 2 === 1
              const iconType = result.icon || (result.id === 1 ? 'check' : result.id === 2 ? 'arrow' : 'users')
              const IconComponent = iconType === 'check' ? CheckSquare : iconType === 'arrow' ? ArrowLeftRight : Users
              const isRed = result.id === 2 // Decision-Making is red
              
              return (
                <div
                  key={result.id}
                  className="grid gap-8 lg:grid-cols-3 xl:gap-12 items-center border-b border-gray-200 pb-8 sm:pb-12 last:border-b-0"
                >
                  {/* Left: Icon + Title + Description */}
                  <div
                    className={[
                      "flex flex-col gap-6 lg:col-span-2 lg:border-r lg:pr-8 xl:pr-12 text-left",
                      reversed
                        ? "lg:order-2 lg:border-r-0 lg:border-l border-gray-200 lg:pl-8 xl:pl-12 lg:pr-0"
                        : "border-gray-200",
                    ].join(" ")}
                  >
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 ${isRed ? 'bg-[#DD0000]' : 'bg-black'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 text-white`} />
                      </div>
                      <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isRed ? 'text-[#DD0000]' : 'text-gray-900'}`}>
                        {result.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <div className="flex flex-col justify-between gap-4 text-left">
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-left">
                        {result.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div
                    className={[
                      "grid grid-cols-1 gap-6 self-center text-left",
                      reversed ? "lg:order-1" : "",
                    ].join(" ")}
                  >
                    {result.metrics.map((metric, i) => (
                      <div key={`${result.id}-${i}`} className={`${isRed ? 'bg-[#DD0000]' : 'bg-black'} text-white rounded-lg`}>
                        <MetricStat
                          value={metric.value}
                          label={metric.label}
                          sub={metric.sub}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

