import "@testing-library/jest-dom"
import {render,screen} from "@testing-library/react"
import Navbar from "./Navbar"

describe("Navbar", () => {
    it("renders a heading named SkyCast", () => {
        render(<Navbar />)

        const heading = screen.getByRole("heading")


        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent("SkyCast")

})})