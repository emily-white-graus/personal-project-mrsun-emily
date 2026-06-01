import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { useFavorites } from "#shared/favorites"

const App: React.FC = () => {
  const [favorites] = useFavorites()

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        <Typography variant="title">Favorites</Typography>

        {favorites.map((favorite, index) => (
          <Typography key={favorite.name} href={`/favorites/${index}`}>
            {favorite.name}
          </Typography>
        ))}
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
