import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Screen from "#design/elements/Screen"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useFavorites } from "#shared/favorites"
import { CurrentSun, Forecast } from "#shared/sun"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [favorites] = useFavorites()
  const location = favorites[Number(id)]

  return (
    <>
      <Stack.Screen options={{ title: location?.name ?? `Favorite ${id}` }} />

      <Screen scroll={false}>
        {location ? (
          <>
            <View style={styles.header}>
              <Typography variant="label">Favorite location</Typography>
              <Typography variant="title">{location.name}</Typography>
            </View>
            <CurrentSun location={location} />
            <Forecast location={location} />
          </>
        ) : (
          <Card>
            <Typography variant="large">Favorite not found</Typography>
            <Typography variant="muted">
              This saved location is no longer available.
            </Typography>
          </Card>
        )}
      </Screen>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
})
