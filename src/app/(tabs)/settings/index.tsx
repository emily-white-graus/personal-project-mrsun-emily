import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors } from "#design/foundations"

const App: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">Settings</Typography>
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
})
