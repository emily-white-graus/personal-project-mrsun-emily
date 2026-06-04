import { useCallback, useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"

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
    <Card style={styles.card}>
      <View style={styles.title}>
        <Typography variant="label">Sunset forecast</Typography>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.day}
        onEndReached={more}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        refreshing={loading}
        style={styles.list}
        renderItem={({ item }) => {
          const window = getBestViewingWindow(item.sunset)
          const rating = getSunsetRating(item.daylight, item.sunshine)

          return (
            <View style={styles.day}>
              <View style={styles.dayHeader}>
                <View>
                  <Typography variant="label">{formatDay(item.day)}</Typography>
                  <Typography variant="title" style={styles.sunsetTime}>
                    {formatTime(item.sunset)}
                  </Typography>
                </View>
                <View style={styles.rating}>
                  <Typography variant="caption" style={styles.ratingText}>
                    {rating.score}/10 {rating.label}
                  </Typography>
                </View>
              </View>

              <Typography variant="caption">
                Goldenhour: {formatTime(window.start.toISOString())} -{" "}
                {formatTime(window.end.toISOString())}
              </Typography>
              <Typography variant="caption">
                Sunrise: {formatTime(item.sunrise)}
              </Typography>
            </View>
          )
        }}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    maxHeight: 420,
  },
  title: {
    marginBottom: spacing.sm,
  },
  list: {
    width: "100%",
  },
  day: {
    gap: 4,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  sunsetTime: {
    fontSize: 28,
    lineHeight: 32,
  },
  rating: {
    flexShrink: 0,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: shapes.pillRadius,
    backgroundColor: colors.surface,
  },
  ratingText: {
    color: colors.accent,
    fontWeight: "700",
  },
})
