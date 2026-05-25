import { Link, Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Temporary" }} />

      <View style={styles.container}>
        <Text>Temporary</Text>
        <Link href="/">Home</Link>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
