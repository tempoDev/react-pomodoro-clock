import { useState } from 'react'
import './App.scss'
import Pomodoro from './Pomodoro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>POMODORO CLOCK</h1>

      <Pomodoro />
    </>
  )
}

export default App
