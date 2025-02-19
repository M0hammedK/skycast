import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'
 
describe('Footer', () => {
  it('renders a heading', () => {
    render(<Footer />)
 
    const heading = screen.getByRole('heading', { name: /®All Right Recived/i })
 
    expect(heading).toBeInTheDocument()
  })
})