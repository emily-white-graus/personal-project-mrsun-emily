import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

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
        <Typography variant="title">{formatTime(data?.sunset)}</Typography>
        <Typography variant="muted">{location.name}</Typography>
        <Typography variant="label">Sunset today</Typography>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Typography variant="large">{formatTime(data?.sunrise)}</Typography>
          <Typography variant="label">Sunrise</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">
            {formatDuration(data?.daylight)}
          </Typography>
          <Typography variant="label">Daylight</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">
            {formatDuration(data?.sunshine)}
          </Typography>
          <Typography variant="label">Sunshine</Typography>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  current: { alignItems: "center", marginBottom: spacing.inside },
  stats: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "center" },
})
