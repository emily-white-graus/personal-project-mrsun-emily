import { render } from "@testing-library/react-native"

import { Forecast } from "./Forecast"

describe("Sun > Forecast", () => {
  beforeEach(() => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => ({
        daily: {
          time: ["2026-06-01"],
          sunrise: ["2026-06-01T06:20"],
          sunset: ["2026-06-01T21:18"],
          daylight_duration: [53880],
          sunshine_duration: [42000],
        },
      }),
    } as Response)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("works", async () => {
    const { findByText } = render(
      <Forecast
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    expect(await findByText("Sunset forecast")).toBeTruthy()
    expect(await findByText("9/10 Excellent")).toBeTruthy()
    expect(await findByText(/Goldenhour:/)).toBeTruthy()
  })
})
