import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Screen from "#design/elements/Screen"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useSettings } from "#shared/settings"
import { CurrentSun, Forecast, useCurrentLocation } from "#shared/sun"

const App: React.FC = () => {
  const location = useCurrentLocation()
  const settings = useSettings()

  return (
    <Screen scroll={false}>
      <View style={styles.header}>
        <Typography variant="title">{settings.home.name}</Typography>
        <Typography variant="muted">
          Sunrise, sunset, and the week ahead.
        </Typography>
      </View>

      {location ? (
        <>
          <CurrentSun location={location} />
          <Forecast location={location} />
        </>
      ) : (
        <Card>
          <Typography variant="large">Loading...</Typography>
          <Typography variant="muted">
            Finding your local sunrise and sunset times.
          </Typography>
        </Card>
      )}

      <Typography href="/temp" variant="caption">
        Temporary
      </Typography>
    </Screen>
  )
}

export default App

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
})
