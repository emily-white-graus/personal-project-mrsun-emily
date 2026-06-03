export type SunsetRating = {
  score: number
  label: string
}

export type SunsetWindow = {
  start: Date
  end: Date
}

export const getBestViewingWindow = (sunset: string): SunsetWindow => {
  const sunsetTime = new Date(sunset)

  return {
    start: addMinutes(sunsetTime, -30),
    end: addMinutes(sunsetTime, 15),
  }
}

export const getSunsetRating = (
  daylight: number,
  sunshine: number,
): SunsetRating => {
  if (daylight <= 0 || sunshine < 0) {
    return { score: 5, label: "Unknown" }
  }

  const sunshineRatio = sunshine / daylight
  const score = clamp(Math.round(4 + sunshineRatio * 6), 1, 10)

  if (score >= 9) return { score, label: "Excellent" }
  if (score >= 7) return { score, label: "Great" }
  if (score >= 5) return { score, label: "Good" }

  return { score, label: "Fair" }
}

const addMinutes = (value: Date, minutes: number): Date => {
  return new Date(value.getTime() + minutes * 60 * 1000)
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}
