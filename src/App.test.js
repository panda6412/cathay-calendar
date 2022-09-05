import { render, screen, fireEvent } from '@testing-library/react'
import moment from 'moment'
import App from './App'

test('Click next button', () => {
  render(<App />)
  const nextButton = screen.getByText(/>/i)
  fireEvent.click(nextButton)

  const current = moment().add(1, 'M')
  const reg = new RegExp(`${current.format('YYYY')}年${current.format('M')}月`, 'i')
  const currentDate = screen.getByText(reg)
  expect(currentDate).toBeInTheDocument()
})

test('Click previous button', () => {
  render(<App />)
  const previousButton = screen.getByText(/>/i)
  fireEvent.click(previousButton)

  const current = moment().add(1, 'M')
  const reg = new RegExp(`${current.format('YYYY')}年${current.format('M')}月`, 'i')
  const currentDate = screen.getByText(reg)
  expect(currentDate).toBeInTheDocument()
})
