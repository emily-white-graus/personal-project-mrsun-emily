import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { useSettings } from "#shared/settings"
import { CurrentSun, Forecast, useCurrentLocation } from "#shared/sun"

const App: React.FC = () => {
  const location = useCurrentLocation()
  const settings = useSettings()

  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">{settings.home.name}</Typography>

        {location ? (
          <>
            <CurrentSun location={location} />
            <Forecast location={location} />
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}

        <Typography href="/temp">Go to Temporary</Typography>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.between,
    backgroundColor: colors.page,
    alignItems: "center",
    justifyContent: "center",
  },
})
