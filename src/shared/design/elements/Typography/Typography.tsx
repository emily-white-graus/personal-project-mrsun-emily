import { Link, type LinkProps } from "expo-router"
import { StyleSheet, Text, type TextProps } from "react-native"

import { typography } from "#design/foundations"

type TypographyProps = {
  variant?: keyof typeof typography
  children: React.ReactNode
  style?: TextProps["style"]
} & (
  | { href?: never }
  | Pick<LinkProps, "href" | "replace" | "push" | "dismissTo">
)

const Typography: React.FC<TypographyProps> = ({
  variant = "normal",
  children,
  style,
  ...props
}) => {
  if ("href" in props && props.href) {
    return (
      <Link {...props} style={[styles[variant], styles.link, style]}>
        {children}
      </Link>
    )
  }

  return (
    <Text {...props} style={[styles[variant], style]}>
      {children}
    </Text>
  )
}

export default Typography

const styles = StyleSheet.create(typography)
