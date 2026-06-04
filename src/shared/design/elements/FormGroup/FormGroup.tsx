import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"

type FormGroupProps = {
  label: string
  children: React.ReactNode
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children }) => {
  return (
    <View style={styles.group}>
      <Typography variant="label" style={styles.label}>
        {label}
      </Typography>
      <View style={styles.value}>{children}</View>
    </View>
  )
}

export default FormGroup

const styles = StyleSheet.create({
  group: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: shapes.fieldRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  label: {
    //
  },
  value: {
    //
  },
})
