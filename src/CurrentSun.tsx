import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import Card from "./Card"

const formatTime = (value?: string): string => {
  if (value === undefined) {
    return "--:--"
  }

  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

const formatDuration = (seconds?: number): string => {
  if (seconds === undefined) {
    return "-- h"
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)

  return `${hours}h ${minutes}m`
}

const CurrentSun: React.FC<{
  location: {
    name: string
    latitude: number
    longitude: number
  }
}> = ({ location }) => {
  const [data, setData] = useState<{
    sunrise: string
    sunset: string
    daylight: number
    sunshine: number
  }>()

  useEffect(() => {
    void (async () => {
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

      setData({
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
        daylight: data.daily.daylight_duration[0],
        sunshine: data.daily.sunshine_duration[0],
      })
    })()
  }, [location])

  return (
    <Card>
      <View style={styles.current}>
        <Text style={styles.sunset}>{formatTime(data?.sunset)}</Text>
        <Text style={styles.location}>{location.name}</Text>
        <Text style={styles.label}>Sunset today</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatTime(data?.sunrise)}</Text>
          <Text style={styles.statLabel}>Sunrise</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatDuration(data?.daylight)}</Text>
          <Text style={styles.statLabel}>Daylight</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatDuration(data?.sunshine)}</Text>
          <Text style={styles.statLabel}>Sunshine</Text>
        </View>
      </View>
    </Card>
  )
}

export default CurrentSun

const styles = StyleSheet.create({
  current: { alignItems: "center", marginBottom: 24 },
  sunset: { fontSize: 28 },
  location: { fontSize: 12, color: "#888" },
  label: { fontWeight: "bold" },
  stats: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "500" },
  statLabel: { fontSize: 12, color: "#888", marginTop: 2 },
})
