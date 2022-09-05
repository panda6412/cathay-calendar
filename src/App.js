import { useState } from 'react'
import './App.css'
import Calendar from './Calendar'

const App = () => {
  const [date, setDate] = useState([])
  return (
    <div className='App'>
      <Calendar
        value={date}
        onChange={value => setDate(value)}
      />
    </div>
  )
}

export default App
