import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Temporary" }} />

      <View style={styles.container}>
        <Typography variant="title">Temporary</Typography>
        <Typography href="/">Home</Typography>
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
