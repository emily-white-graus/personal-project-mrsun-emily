import { render } from "@testing-library/react-native"

import { CurrentSun } from "./CurrentSun"

describe("Sun > CurrentSun", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        daily: {
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
      <CurrentSun
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    expect(await findByText("Barcelona")).toBeTruthy()
    expect(await findByText("Sunset today")).toBeTruthy()
  })
})
