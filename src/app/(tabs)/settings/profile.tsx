import { useEffect, useState } from "react"
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

const App: React.FC = () => {
  const [name, setName] = useState("MrSun user")
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      void (async () => {
        await hapticImpact()
        await createNotification({
          title: "MrSun",
          short: "Sunset",
          body: "Your local sunset time is ready.",
        })
      })()
    }, 2500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="title">Profile</Typography>
        <Typography variant="muted">
          Manage your display name and alerts.
        </Typography>
      </View>

      <Card>
        <View style={styles.form}>
          <FormGroup label="Name">
            <TextField onChange={setName} value={name} />
          </FormGroup>

          <FormGroup label="Alerts">
            <ToggleField onChange={setNotifications} value={notifications} />
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
