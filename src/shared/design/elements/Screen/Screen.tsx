import {
  ScrollView,
  StyleSheet,
  type StyleProp,
  View,
  type ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing } from "#design/foundations"

type ScreenProps = {
  children: React.ReactNode
  contentStyle?: StyleProp<ViewStyle>
  scroll?: boolean
}

const Screen: React.FC<ScreenProps> = ({
  children,
  contentStyle,
  scroll = true,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.staticContent, contentStyle]}>
          {children}
        </View>
      )}
    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.page,
  },
  content: {
    flexGrow: 1,
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  staticContent: {
    flex: 1,
  },
})
