import { Drawer } from "expo-router/drawer"

import { colors } from "#design/foundations"

const Layout: React.FC = () => {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: colors.accent,
        drawerInactiveTintColor: colors.muted,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: {
          backgroundColor: colors.page,
        },
        headerTintColor: colors.text,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Settings" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
    </Drawer>
  )
}

export default Layout
