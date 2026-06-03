import { getBestViewingWindow, getSunsetRating } from "./sunsetPrediction"

describe("Sun > sunsetPrediction", () => {
  it("calculates the best viewing window around sunset", () => {
    const window = getBestViewingWindow("2026-06-01T21:18:00.000Z")

    expect(window.start.toISOString()).toBe("2026-06-01T20:48:00.000Z")
    expect(window.end.toISOString()).toBe("2026-06-01T21:33:00.000Z")
  })

  it("rates the sunset from sunshine and daylight", () => {
    expect(getSunsetRating(53880, 42000)).toEqual({
      score: 9,
      label: "Excellent",
    })
  })
})
