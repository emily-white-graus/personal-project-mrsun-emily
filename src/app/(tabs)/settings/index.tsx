import { StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import FormGroup from "#design/elements/FormGroup"
import Typography from "#design/elements/Typography"
import { colors } from "#design/foundations"
import { useSettings, useSettingsSetter } from "#shared/settings"

const App: React.FC = () => {
  const settings = useSettings()
  const setSettings = useSettingsSetter()

  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">Settings</Typography>

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
