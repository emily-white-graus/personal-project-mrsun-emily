import { type ReactElement } from "react"
import { Text } from "react-native"

const FontAwesome = ({ name }: { name: string }): ReactElement => {
  return <Text>{name}</Text>
}

export default FontAwesome
