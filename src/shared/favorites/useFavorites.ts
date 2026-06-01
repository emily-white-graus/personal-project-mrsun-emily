import Storage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

import { type SunLocation } from "../sun/types"

const STORAGE_KEY = "favorites"

const defaultFavorites: SunLocation[] = [
  { name: "Reno", latitude: 39.5299, longitude: 119.8143 },
  { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 },
]

export function useFavorites(): [SunLocation[]] {
  const [favorites, setFavorites] = useState<SunLocation[]>(defaultFavorites)

  useEffect(() => {
    void (async () => {
      const cached = await Storage.getItem(STORAGE_KEY)
      if (!cached) {
        await Storage.setItem(STORAGE_KEY, JSON.stringify(defaultFavorites))
        return
      }

      const favorites = JSON.parse(cached) as SunLocation[]
      setFavorites(favorites)
    })()
  }, [])

  return [favorites]
}
