import { type SunLocation } from "./types"

type GeocodingResult = {
  name: string
  latitude: number
  longitude: number
  admin1?: string
  country?: string
}

type GeocodingResponse = {
  results?: GeocodingResult[]
}

export async function searchSunLocations(
  query: string,
): Promise<SunLocation[]> {
  const search = query.trim()
  if (search.length < 2) {
    return []
  }

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&count=5&language=en&format=json`,
  )
  const data = (await response.json()) as GeocodingResponse

  return (data.results ?? []).map((result) => ({
    name: formatLocationName(result),
    latitude: result.latitude,
    longitude: result.longitude,
  }))
}

function formatLocationName(result: GeocodingResult): string {
  const parts = [result.name, result.admin1, result.country].filter(
    (part): part is string => Boolean(part),
  )

  return [...new Set(parts)].join(", ")
}
