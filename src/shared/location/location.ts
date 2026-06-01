import * as ExpoLocation from "expo-location"

export type DeviceLocation = {
  latitude: number
  longitude: number
}

let configured: boolean | null = null

async function configureLocation(): Promise<boolean> {
  if (configured !== null) return configured

  const { status } = await ExpoLocation.requestForegroundPermissionsAsync()
  if (status !== ExpoLocation.PermissionStatus.GRANTED) {
    console.warn("Permission to access location was denied")

    configured = false
    return false
  }

  configured = true
  return true
}

export async function getLocation(): Promise<DeviceLocation | undefined> {
  const canUseLocation = await configureLocation()
  if (!canUseLocation) return undefined

  try {
    const location = await ExpoLocation.getCurrentPositionAsync()

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export async function lookupLocation(
  type: "country" | "city" | "address",
  coords: DeviceLocation,
): Promise<string> {
  void type
  void coords

  return "Here"
}
