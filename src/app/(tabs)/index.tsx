import { useState } from "react"

import Card from "#design/elements/Card"
import Screen from "#design/elements/Screen"
import Typography from "#design/elements/Typography"
import { useSettings } from "#shared/settings"
import {
  CurrentSun,
  Forecast,
  LocationSearch,
  type SunLocation,
  useCurrentLocation,
} from "#shared/sun"

const App: React.FC = () => {
  const currentLocation = useCurrentLocation()
  const [selectedLocation, setSelectedLocation] = useState<SunLocation>()
  const settings = useSettings()
  const location = selectedLocation ?? currentLocation

  return (
    <Screen scroll={false}>
      <Typography variant="title">{settings.home.name}</Typography>
      <Typography variant="muted">
        {settings.profile.name}
        {settings.notifications.enabled
          ? ` - sunset alert ${settings.notifications.reminderMinutes} min before`
          : " - sunset alerts off"}
      </Typography>

      <LocationSearch onSelect={setSelectedLocation} />

      {location ? (
        <>
          <CurrentSun location={location} />
          <Forecast location={location} />
        </>
      ) : (
        <Card>
          <Typography variant="large">Loading...</Typography>
          <Typography variant="muted">
            Finding your local sunrise and sunset times.
          </Typography>
        </Card>
      )}

      <Typography href="/temp" variant="caption">
        Temporary
      </Typography>
    </Screen>
  )
}

export default App
