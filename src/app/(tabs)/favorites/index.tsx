import { Link, Stack } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon from "#design/elements/Icon"
import Screen from "#design/elements/Screen"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import { useFavorites } from "#shared/favorites"

const App: React.FC = () => {
  const [favorites] = useFavorites()

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <Screen>
        <Typography variant="title">Favorites</Typography>

        {favorites.length > 0 ? (
          <View style={styles.list}>
            {favorites.map((favorite, index) => (
              <Link asChild href={`/favorites/${index}`} key={favorite.name}>
                <Pressable style={styles.favorite}>
                  <View style={styles.favoriteIcon}>
                    <Icon color={colors.accent} name="location" size={18} />
                  </View>
                  <Typography variant="large" style={styles.favoriteName}>
                    {favorite.name}
                  </Typography>
                  <Icon color={colors.muted} name="next" size={16} />
                </Pressable>
              </Link>
            ))}
          </View>
        ) : (
          <Card>
            <Typography variant="large">No favorites yet</Typography>
            <Typography variant="muted">
              Saved locations will appear here.
            </Typography>
          </Card>
        )}
      </Screen>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  favorite: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: shapes.fieldRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  favoriteIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: shapes.pillRadius,
    backgroundColor: colors.surface,
  },
  favoriteName: {
    flex: 1,
  },
})
