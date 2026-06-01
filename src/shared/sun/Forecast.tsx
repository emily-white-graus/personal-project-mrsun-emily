import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { type SunForecastData, fetchSunForecast } from "./sunApi"
import { type SunLocation } from "./types"

const formatDay = (value: string): string => {
  return new Date(value).toLocaleDateString([], { weekday: "short" })
}

const formatTime = (value: string): string => {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const Forecast: React.FC<{
  location: SunLocation
}> = ({ location }) => {
  const [data, setData] = useState<SunForecastData>()

  useEffect(() => {
    void (async () => {
      setData(await fetchSunForecast(location))
    })()
  }, [location])

  return (
    <Card>
      <View style={styles.title}>
        <Typography variant="label">Sunset forecast</Typography>
      </View>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, sunrise, sunset }) => (
          <View key={day} style={styles.day}>
            <Typography variant="muted">{formatDay(day)}</Typography>
            <Typography variant="large">{formatTime(sunset)}</Typography>
            <Typography variant="muted">{formatTime(sunrise)}</Typography>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "flex-start",
    marginBottom: spacing.between,
  },
  days: { flexGrow: 0, flexDirection: "row" },
  day: { flex: 1, alignItems: "center", marginHorizontal: spacing.between },
})
