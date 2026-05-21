import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import Card from "./Card"
import { type Location, type SunForecastData, fetchSunForecast } from "./sunApi"

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
  location: Location
}> = ({ location }) => {
  const [data, setData] = useState<SunForecastData>()

  useEffect(() => {
    void (async () => {
      setData(await fetchSunForecast(location))
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
