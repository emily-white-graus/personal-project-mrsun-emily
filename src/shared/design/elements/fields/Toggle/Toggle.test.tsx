import { fireEvent, render } from "@testing-library/react-native"

import FormGroup from "#design/elements/FormGroup"

import Toggle from "./Toggle"

describe("Design > Elements > Fields > Toggle", () => {
  it("works", () => {
    const { getByRole } = render(
      <Toggle onChange={() => undefined} value={true} />,
    )

    expect(getByRole("switch")).toBeTruthy()
  })

  it("handles changes", () => {
    const callback = jest.fn()
    const { getByRole } = render(<Toggle onChange={callback} value={true} />)

    const value = getByRole("switch")
    fireEvent(value, "valueChange", false)

    expect(callback).toHaveBeenCalledWith(false)
  })

  it("works with FormGroup", () => {
    const { getByText, getByRole } = render(
      <FormGroup label="Toggle Field">
        <Toggle onChange={() => undefined} value={true} />
      </FormGroup>,
    )

    expect(getByText("Toggle Field")).toBeTruthy()
    expect(getByRole("switch")).toBeTruthy()
  })
})
