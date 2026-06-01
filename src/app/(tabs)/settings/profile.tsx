import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import ToggleField from "#design/elements/fields/Toggle"
import FormGroup from "#design/elements/FormGroup"
import Typography from "#design/elements/Typography"
import { colors } from "#design/foundations"
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
    <>
      <View style={styles.container}>
        <Typography variant="title">Profile</Typography>

        <View style={styles.form}>
          <FormGroup label="Name">
            <TextField onChange={setName} value={name} />
          </FormGroup>

          <FormGroup label="Alerts">
            <ToggleField onChange={setNotifications} value={notifications} />
          </FormGroup>
        </View>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.page,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    maxWidth: 360,
  },
})
