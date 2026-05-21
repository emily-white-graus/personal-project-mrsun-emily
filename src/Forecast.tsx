import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import Card from "./Card"

const formatDay = (value: string): string => {
  return new Date(value).toLocaleDateString([], { weekday: "short" })
}

const formatTime = (value: string): string => {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

const Forecast: React.FC<{
  location: {
    name: string
    latitude: number
    longitude: number
  }
}> = ({ location }) => {
  const [data, setData] = useState<
    Array<{
      day: string
      sunrise: string
      sunset: string
    }>
  >()

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=sunrise,sunset&timezone=auto`,
      )
      const data = (await response.json()) as {
        daily: {
          time: string[]
          sunrise: string[]
          sunset: string[]
        }
      }

      const forecast = []
      for (let i = 0; i < data.daily.time.length; i++) {
        forecast.push({
          day: data.daily.time[i],
          sunrise: data.daily.sunrise[i],
          sunset: data.daily.sunset[i],
        })
      }

      setData(forecast)
    })()
  }, [location])

  return (
    <Card>
      <Text style={styles.title}>Sunset forecast</Text>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, sunrise, sunset }) => (
          <View key={day} style={styles.day}>
            <Text style={styles.dayLabel}>{formatDay(day)}</Text>
            <Text style={styles.sunset}>{formatTime(sunset)}</Text>
            <Text style={styles.sunrise}>{formatTime(sunrise)}</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

export default Forecast

const styles = StyleSheet.create({
  title: {
    alignSelf: "flex-start",
    marginBottom: 16,
    fontWeight: "bold",
  },
  days: { flexGrow: 0, flexDirection: "row" },
  day: { flex: 1, alignItems: "center", marginHorizontal: 16 },
  dayLabel: { fontSize: 12, color: "#888", marginBottom: 4 },
  sunset: { fontSize: 18 },
  sunrise: { fontSize: 14, color: "#888" },
})
