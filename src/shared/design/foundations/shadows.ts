import { type ViewStyle } from "react-native"

import { shadow } from "./colors"

export const main: ViewStyle = {
  boxShadow: `0px 8px 20px ${shadow}`,
  shadowColor: shadow,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 1,
  shadowRadius: 20,
  elevation: 3,
}
