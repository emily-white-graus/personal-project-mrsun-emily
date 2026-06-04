import { useEffect, useState } from "react"
import { ImageBackground, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import sunsetBackground from "../../../assets/sunset-background.jpg"

import { type CurrentSunData, fetchCurrentSun } from "./sunApi"
import { type SunLocation } from "./types"

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
  location: SunLocation
}> = ({ location }) => {
  const [data, setData] = useState<CurrentSunData>()

  useEffect(() => {
    void (async () => {
      try {
        setData(await fetchCurrentSun(location))
      } catch (error) {
        console.error(error)
      }
    })()
  }, [location])

  return (
    <Card style={styles.card} variant="hero">
      <ImageBackground
        resizeMode="cover"
        source={sunsetBackground}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.current}>
            <View style={styles.location}>
              <Icon color={colors.textOnAccent} name="location" size={16} />
              <Typography variant="inverse">{location.name}</Typography>
            </View>
            <Typography variant="inverseLabel">Sunset today</Typography>
            <Typography variant="hero">{formatTime(data?.sunset)}</Typography>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Typography variant="large" style={styles.inverseStat}>
                {formatTime(data?.sunrise)}
              </Typography>
              <Typography variant="inverseLabel">Sunrise</Typography>
            </View>
            <View style={styles.stat}>
              <Typography variant="large" style={styles.inverseStat}>
                {formatDuration(data?.daylight)}
              </Typography>
              <Typography variant="inverseLabel">Daylight</Typography>
            </View>
            <View style={styles.stat}>
              <Typography variant="large" style={styles.inverseStat}>
                {formatDuration(data?.sunshine)}
              </Typography>
              <Typography variant="inverseLabel">Sunshine</Typography>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
  },
  background: {
    width: "100%",
  },
  overlay: {
    padding: spacing.lg,
    backgroundColor: "rgba(60, 28, 18, 0.32)",
  },
  current: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  stats: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 253, 248, 0.45)",
    paddingTop: spacing.md,
  },
  stat: {
    flex: 1,
    gap: spacing.xs,
  },
  inverseStat: {
    color: colors.textOnAccent,
  },
})
