import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { CurrentSun, Forecast } from "../../shared/sun"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">MrSun</Typography>

        <CurrentSun location={location} />
        <Forecast location={location} />

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
