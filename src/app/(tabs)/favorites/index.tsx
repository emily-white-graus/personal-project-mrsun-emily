import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        <Typography variant="title">Favorites</Typography>

        <Typography href="/favorites/one">One</Typography>
        <Typography href="/favorites/two">Two</Typography>
        <Typography href="/favorites/three">Three</Typography>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.between / 2,
    backgroundColor: colors.page,
    alignItems: "center",
    justifyContent: "center",
  },
})
