import Storage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

import { getLocation, lookupLocation } from "#shared/location"

import { type SunLocation } from "./types"

const STORAGE_KEY = "cached-location"

export function useCurrentLocation(): SunLocation | undefined {
  const [location, setLocation] = useState<SunLocation>()

  useEffect(() => {
    void (async () => {
      const currentLocation = await getLocation()
      if (currentLocation) {
        const location: SunLocation = {
          name: await lookupLocation("city", currentLocation),
          ...currentLocation,
        }

        setLocation(location)
        await Storage.setItem(STORAGE_KEY, JSON.stringify(location))
        return
      }

      const cachedLocation = await Storage.getItem(STORAGE_KEY)
      if (cachedLocation) {
        const location = JSON.parse(cachedLocation) as SunLocation
        setLocation(location)
        return
      }

      setLocation({
        name: "Barcelona",
        latitude: 41.385063,
        longitude: 2.173404,
      })
    })()
  }, [])

  return location
}
