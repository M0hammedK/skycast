import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Table from './Table'
 
describe('Table', () => {
  it('renders a table with Listed items', () => {
    render(<Table Heads={['Head1', 'Head2', 'Head3']} />)
 
    const heading = screen.getByRole('table')
 
    expect(heading).toBeInTheDocument()
  })
})