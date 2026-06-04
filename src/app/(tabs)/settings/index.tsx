import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import TextField from "#design/elements/fields/Text"
import FormGroup from "#design/elements/FormGroup"
import Screen from "#design/elements/Screen"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useSettings, useSettingsSetter } from "#shared/settings"

const App: React.FC = () => {
  const settings = useSettings()
  const setSettings = useSettingsSetter()
  const reminderMinutes = String(settings.notifications.reminderMinutes)

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="title">Settings</Typography>
        <Typography variant="muted">Adjust your MrSun preferences.</Typography>
      </View>

      <Card>
        <View style={styles.form}>
          <FormGroup label="Home Title">
            <TextField
              onChange={(value) =>
                setSettings({
                  ...settings,
                  home: {
                    ...settings.home,
                    name: value,
                  },
                })
              }
              value={settings.home.name}
            />
          </FormGroup>

          <FormGroup label="Reminder Minutes Before Sunset">
            <TextField
              keyboardType="number-pad"
              onChange={(value) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    reminderMinutes: toReminderMinutes(value),
                  },
                })
              }
              value={reminderMinutes}
            />
          </FormGroup>
        </View>
      </Card>
    </Screen>
  )
}

export default App

function toReminderMinutes(value: string): number {
  const minutes = Number.parseInt(value.replace(/\D/g, ""), 10)

  if (Number.isNaN(minutes)) {
    return 0
  }

  return Math.min(minutes, 180)
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
  form: {
    width: "100%",
    gap: spacing.md,
  },
})
