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

  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="title">Settings</Typography>
        <Typography variant="muted">Adjust the home label.</Typography>
      </View>

      <Card>
        <View style={styles.form}>
          <FormGroup label="Home Name">
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
