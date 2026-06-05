import { fireEvent, render, waitFor } from "@testing-library/react-native"

import LocationSearch from "./LocationSearch"

describe("Sun > LocationSearch", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("searches cities and selects the first result", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
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
    const onSelect = jest.fn()

    const { getByPlaceholderText, getByText } = render(
      <LocationSearch onSelect={onSelect} />,
    )

    fireEvent.changeText(getByPlaceholderText("Search city"), "Barcelona")
    fireEvent.press(getByText("Search"))

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith({
        name: "Barcelona, Catalonia, Spain",
        latitude: 41.38879,
        longitude: 2.15899,
      })
    })
  })

  it("ignores short searches", () => {
    const onSelect = jest.fn()
    const { getByPlaceholderText, getByText } = render(
      <LocationSearch onSelect={onSelect} />,
    )

    fireEvent.changeText(getByPlaceholderText("Search city"), "A")
    fireEvent.press(getByText("Search"))

    expect(onSelect).not.toHaveBeenCalled()
  })
})
