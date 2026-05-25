import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import Card from "../design/Card"

import { type CurrentSunData, type Location, fetchCurrentSun } from "./sunApi"

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

export const CurrentSun: React.FC<{
  location: Location
}> = ({ location }) => {
  const [data, setData] = useState<CurrentSunData>()

  useEffect(() => {
    void (async () => {
      setData(await fetchCurrentSun(location))
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
