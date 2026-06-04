import { searchSunLocations } from "./searchSunLocations"

describe("Sun > searchSunLocations", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("maps geocoding results to sun locations", async () => {
    const fetch = jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        results: [
          {
            name: "Barcelona",
            admin1: "Catalonia",
            country: "Spain",
            latitude: 41.38879,
            longitude: 2.15899,
          },
        ],
      }),
    } as Response)

    await expect(searchSunLocations("Barcelona")).resolves.toEqual([
      {
        name: "Barcelona, Catalonia, Spain",
        latitude: 41.38879,
        longitude: 2.15899,
      },
    ])
    expect(fetch).toHaveBeenCalledWith(
      "https://geocoding-api.open-meteo.com/v1/search?name=Barcelona&count=5&language=en&format=json",
    )
  })

  it("returns an empty array when there are no results", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({}),
    } as Response)

    await expect(searchSunLocations("Atlantis")).resolves.toEqual([])
  })
})
