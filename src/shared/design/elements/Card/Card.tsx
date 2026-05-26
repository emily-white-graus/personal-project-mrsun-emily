import { StyleSheet, View } from "react-native"

import { colors, shadows, shapes, spacing } from "#design/foundations"

type CardProps = {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: spacing.inside,
    margin: spacing.between,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    ...shadows.main,
  },
})
