import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"

import { searchSunLocations } from "./searchSunLocations"
import { type SunLocation } from "./types"

type LocationSearchProps = {
  onSelect: (location: SunLocation) => void
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const search = query.trim()

    if (search.length < 2) {
      return
    }

    setLoading(true)

    try {
      const locations = await searchSunLocations(search)
      const [location] = locations
      if (location) {
        onSelect(location)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.searchRow}>
      <TextField
        onChange={setQuery}
        onSubmitEditing={submit}
        placeholder="Search city"
        returnKeyType="search"
        style={styles.input}
        value={query}
      />
      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={submit}
        style={[styles.button, loading && styles.loadingButton]}
      >
        <Typography variant="inverseLabel">Search</Typography>
      </Pressable>
    </View>
  )
}

export default LocationSearch

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.sm,
  },
  input: {
    flex: 1,
  },
  button: {
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: shapes.fieldRadius,
    backgroundColor: colors.accent,
  },
  loadingButton: {
    opacity: 0.65,
  },
})
