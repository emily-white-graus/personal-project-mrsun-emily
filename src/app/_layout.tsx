import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { colors } from "#design/foundations"
import { SettingsProvider } from "#shared/settings"

const Layout: React.FC = () => {
  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor={colors.page} style="dark" />
    </SettingsProvider>
  )
}

export default Layout
