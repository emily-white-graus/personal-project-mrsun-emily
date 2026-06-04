import { type TextInputProps, StyleSheet, TextInput } from "react-native"

import { colors, shapes, spacing, typography } from "#design/foundations"

type TextFieldProps = {
  onChange: (value: string) => void
  value: string
} & Omit<TextInputProps, "onChange" | "value" | "onChangeText">

const TextField: React.FC<TextFieldProps> = ({
  onChange,
  value,
  style,
  ...props
}) => {
  return (
    <TextInput
      onChangeText={onChange}
      value={value}
      style={[styles.input, style]}
      {...props}
    />
  )
}

export default TextField

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: shapes.fieldRadius,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: typography.normal.fontSize,
    lineHeight: typography.normal.lineHeight,
  },
})
