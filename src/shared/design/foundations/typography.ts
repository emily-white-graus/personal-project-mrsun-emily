import { type TextStyle } from "react-native"

import {
  accent as accentColor,
  muted as mutedColor,
  text,
  textOnAccent,
} from "./colors"

const baseSize = 16

const typography = {
  normal: {
    fontSize: baseSize,
    lineHeight: 24,
    color: text,
  },

  large: {
    fontSize: 20,
    lineHeight: 28,
    color: text,
    fontWeight: "700",
  },

  muted: {
    fontSize: baseSize,
    lineHeight: 24,
    color: mutedColor,
  },

  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: mutedColor,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 34,
    lineHeight: 40,
    color: accentColor,
    fontWeight: "700",
  },

  link: {
    fontSize: baseSize,
    lineHeight: 24,
    color: accentColor,
    fontWeight: "700",
  },

  hero: {
    fontSize: 46,
    lineHeight: 52,
    color: textOnAccent,
    fontWeight: "800",
  },

  inverse: {
    fontSize: baseSize,
    lineHeight: 24,
    color: textOnAccent,
  },

  inverseLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: textOnAccent,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  caption: {
    fontSize: 13,
    lineHeight: 18,
    color: mutedColor,
  },
} satisfies Record<string, TextStyle>

export default typography
