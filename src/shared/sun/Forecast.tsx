import { useCallback, useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, shadows, shapes, spacing } from "#design/foundations"

import { type SunForecastData, fetchSunForecast } from "./sunApi"
import { getBestViewingWindow, getSunsetRating } from "./sunsetPrediction"
import { type SunLocation } from "./types"

const firstPageSize = 5
const pageSize = 3
const maxForecastDays = 16

const formatDay = (value: string): string => {
  return new Date(value).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
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
  const [data, setData] = useState<SunForecastData>([])
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState(firstPageSize)

  const refresh = useCallback(async () => {
    setLoading(true)

    try {
      setDays(firstPageSize)
      setData(await fetchSunForecast(location, firstPageSize))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [location])

  const more = useCallback(async () => {
    if (loading || days >= maxForecastDays) {
      return
    }

    const nextDays = Math.min(days + pageSize, maxForecastDays)
    setLoading(true)

    try {
      setDays(nextDays)
      setData(await fetchSunForecast(location, nextDays))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [days, loading, location])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <Typography variant="label">Sunset forecast</Typography>
      </View>

      <FlatList
        style={styles.list}
        data={data}
        refreshing={loading}
        onRefresh={refresh}
        onEndReached={more}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => {
          const window = getBestViewingWindow(item.sunset)
          const rating = getSunsetRating(item.daylight, item.sunshine)

          return (
            <View style={styles.day}>
              <View style={styles.dayHeader}>
                <Typography variant="label">{formatDay(item.day)}</Typography>
                <Typography variant="large">
                  {rating.score}/10 {rating.label}
                </Typography>
              </View>

              <Typography variant="title">{formatTime(item.sunset)}</Typography>
              <Typography variant="muted">
                Best time: {formatTime(window.start.toISOString())} -{" "}
                {formatTime(window.end.toISOString())}
              </Typography>
              <Typography variant="muted">
                Sunrise: {formatTime(item.sunrise)}
              </Typography>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxHeight: 420,
    padding: spacing.inside,
    margin: spacing.between,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    ...shadows.main,
  },
  title: {
    alignSelf: "flex-start",
    marginBottom: spacing.between,
  },
  list: {
    width: "100%",
  },
  day: {
    paddingVertical: spacing.between,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.between,
  },
})
