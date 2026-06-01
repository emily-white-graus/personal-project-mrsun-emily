import { render } from "@testing-library/react-native"

import Icon from "./Icon"

jest.mock("@expo/vector-icons/FontAwesome")

describe("Design > Elements > Icon", () => {
  it("works", () => {
    const { getByText } = render(<Icon name="home" />)

    expect(getByText("home")).toBeTruthy()
  })
})
