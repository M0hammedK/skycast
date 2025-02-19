import "@testing-library/jest-dom"
import {render,screen} from "@testing-library/react"
import Panel from "./Panel"

const weather={
    "name":"a",
    "region":"aa",
    "country":"aaa",
    "localtime":new Date().getTime(),
    "lastUpdated":new Date().getTime(),
    "day":'[]',
    'forecat':'[]',
    "conditionText":'',
    "heatIndexC":""

}


describe("Navbar", () => {
    it("renders a heading named SkyCast", () => {
        render(<Panel />)

        const heading = screen.getByRole("heading",{level:1})
        // const heading2 = screen.getByRole("heading",{level:3})
        // const heading3 = screen.getByRole("heading",{level:3})

        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(weather.name)

        
        // expect(heading2).toBeInTheDocument()
        // expect(heading2).toHaveTextContent(weather.conditionText)

        // expect(heading3).toBeInTheDocument()
        // expect(heading3).toHaveTextContent(weather.heatIndexC)



})})