import { type SwitchProps, StyleSheet, Switch } from "react-native"

import { colors } from "#design/foundations"

type ToggleFieldProps = {
  onChange: (value: boolean) => void
  value: boolean
} & Omit<SwitchProps, "onChange" | "value" | "onValueChange">

const ToggleField: React.FC<ToggleFieldProps> = ({
  onChange,
  value,
  style,
  ...props
}) => {
  return (
    <Switch
      ios_backgroundColor={colors.border}
      onValueChange={onChange}
      thumbColor={value ? colors.background : colors.surface}
      trackColor={{ false: colors.border, true: colors.accent }}
      value={value}
      style={[styles.input, style]}
      {...props}
    />
  )
}

export default ToggleField

const styles = StyleSheet.create({
  input: {
    //
  },
})
