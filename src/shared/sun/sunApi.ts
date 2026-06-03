import { type SunLocation } from "./types"

export type CurrentSunData = {
  sunrise: string
  sunset: string
  daylight: number
  sunshine: number
}

export type SunForecastData = Array<{
  day: string
  sunrise: string
  sunset: string
  daylight: number
  sunshine: number
}>

export const fetchCurrentSun = async (
  location: SunLocation,
): Promise<CurrentSunData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=sunrise,sunset,daylight_duration,sunshine_duration&timezone=auto&forecast_days=1`,
  )
  const data = (await response.json()) as {
    daily: {
      sunrise: string[]
      sunset: string[]
      daylight_duration: number[]
      sunshine_duration: number[]
    }
  }

  return {
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
    daylight: data.daily.daylight_duration[0],
    sunshine: data.daily.sunshine_duration[0],
  }
}

export const fetchSunForecast = async (
  location: SunLocation,
  days = 7,
): Promise<SunForecastData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=sunrise,sunset,daylight_duration,sunshine_duration&timezone=auto&forecast_days=${days}`,
  )
  const data = (await response.json()) as {
    daily: {
      time: string[]
      sunrise: string[]
      sunset: string[]
      daylight_duration: number[]
      sunshine_duration: number[]
    }
  }

  const forecast = []
  for (let i = 0; i < data.daily.time.length; i++) {
    forecast.push({
      day: data.daily.time[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i],
      daylight: data.daily.daylight_duration[i],
      sunshine: data.daily.sunshine_duration[i],
    })
  }

  return forecast
}
