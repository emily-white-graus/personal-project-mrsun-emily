import { type TextStyle } from "react-native"

import { accent as accentColor, muted as mutedColor, text } from "./colors"

const baseSize = 16

const typography = {
  normal: {
    fontSize: baseSize,
    color: text,
  },

  large: {
    fontSize: baseSize * 1.25,
    color: text,
    fontWeight: "500",
  },

  muted: {
    fontSize: baseSize,
    color: mutedColor,
  },

  label: {
    fontSize: baseSize * 0.875,
    fontWeight: "bold",
    color: mutedColor,
  },

  title: {
    fontSize: baseSize * 2,
    color: accentColor,
    fontWeight: "700",
  },

  link: {
    fontSize: baseSize,
    color: accentColor,
    fontWeight: "600",
  },
} satisfies Record<string, TextStyle>

export default typography
