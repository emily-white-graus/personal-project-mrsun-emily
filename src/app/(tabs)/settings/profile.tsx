import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import TextField from "#design/elements/fields/Text"
import ToggleField from "#design/elements/fields/Toggle"
import FormGroup from "#design/elements/FormGroup"
import Screen from "#design/elements/Screen"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { hapticImpact } from "#shared/haptics"
import { createNotification } from "#shared/notification"
import { useSettings, useSettingsSetter } from "#shared/settings"

const App: React.FC = () => {
  const settings = useSettings()
  const setSettings = useSettingsSetter()

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="title">Profile</Typography>
        <Typography variant="muted">
          Personalize your sunset reminders.
        </Typography>
      </View>

      <Card>
        <View style={styles.form}>
          <FormGroup label="Display Name">
            <TextField
              onChange={(value) =>
                setSettings({
                  ...settings,
                  profile: {
                    ...settings.profile,
                    name: value,
                  },
                })
              }
              value={settings.profile.name}
            />
          </FormGroup>

          <FormGroup label="Sunset Alerts">
            <ToggleField
              onChange={(value) => {
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    enabled: value,
                  },
                })

                if (value) {
                  void hapticImpact()
                  void createNotification({
                    title: "MrSun",
                    short: "Reminder set!",
                    body: "Reminder set!",
                  })
                }
              }}
              value={settings.notifications.enabled}
            />
          </FormGroup>
        </View>
      </Card>
    </Screen>
  )
}

export default App

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
  form: {
    width: "100%",
    gap: spacing.md,
  },
})
