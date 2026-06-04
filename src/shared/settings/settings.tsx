import Storage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Settings = {
  home: {
    name: string
  }
  profile: {
    name: string
  }
  notifications: {
    enabled: boolean
    favorites: boolean
    reminderMinutes: number
  }
}

const defaultSettings: Settings = {
  home: {
    name: "Home",
  },
  profile: {
    name: "MrSun user",
  },
  notifications: {
    enabled: false,
    favorites: true,
    reminderMinutes: 30,
  },
}

const STORAGE_KEY = "settings"

const Context = createContext<
  | {
      set: (settings: Settings) => void
      settings: Settings
    }
  | undefined
>(undefined)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    void Storage.getItem(STORAGE_KEY).then((cached) => {
      if (!cached) return

      setSettings(normalizeSettings(JSON.parse(cached) as Partial<Settings>))
    })
  }, [])

  const value = useMemo(
    () => ({
      set: (settings: Settings) => {
        setSettings(settings)
        void Storage.setItem(STORAGE_KEY, JSON.stringify(settings))
      },
      settings,
    }),
    [settings],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useSettings(): Settings {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SettingsProvider.")

  return context.settings
}

export function useSettingsSetter(): (settings: Settings) => void {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SettingsProvider.")

  return context.set
}

function normalizeSettings(settings: Partial<Settings>): Settings {
  return {
    ...defaultSettings,
    ...settings,
    home: {
      ...defaultSettings.home,
      ...settings.home,
    },
    profile: {
      ...defaultSettings.profile,
      ...settings.profile,
    },
    notifications: {
      ...defaultSettings.notifications,
      ...settings.notifications,
    },
  }
}
