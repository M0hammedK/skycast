import '@testing-library/jest-dom'
import '@testing-library/react'
import {getByRole, render,screen} from '@testing-library/react'
import Home from './page'

describe('Home' , () => {

    it('renders Welome Header',() =>{
        render(<Home/>)
        const heading = screen.getAllByRole('heading' , {level:1})
        expect(heading.some(heading=>heading.textContent==='welcome to our weather page')).toBe(true)
    })
})