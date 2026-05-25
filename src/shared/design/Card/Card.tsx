import { StyleSheet, View } from "react-native"

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ffffff",
    borderRadius: 20,

    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
})
