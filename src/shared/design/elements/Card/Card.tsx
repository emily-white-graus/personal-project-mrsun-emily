import { StyleSheet, type StyleProp, View, type ViewStyle } from "react-native"

import { colors, shadows, shapes, spacing } from "#design/foundations"

type CardProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  variant?: "default" | "hero"
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = "default",
}) => {
  return (
    <View style={[styles.container, variant === "hero" && styles.hero, style]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.lg,

    overflow: "hidden",

    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    ...shadows.main,
  },
  hero: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
})
