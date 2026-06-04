import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Screen from "#design/elements/Screen"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Temporary" }} />

      <Screen contentStyle={styles.container}>
        <Card>
          <View style={styles.content}>
            <Typography variant="title">Temporary</Typography>
            <Typography href="/">Home</Typography>
          </View>
        </Card>
      </Screen>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  content: {
    gap: spacing.sm,
  },
})
