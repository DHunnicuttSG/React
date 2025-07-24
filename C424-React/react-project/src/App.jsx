import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactCard from './components/Contact'

import RenderMaps from './components/UsingMaps'
import PersonalInfo from './components/exercise1/PersonalInfo'
import MyHeader from './components/exercise2/Header'

function App() {
  const [count, setCount] = useState(0)
  const myName = "David Hunnicutt"
  const age = 61
  const bio = "Hello, my name is David and I have been working in the industry for 20 plus years... "


  return (
    <>

      
      <MyHeader />
      <PersonalInfo myName={myName} age={age} bio={bio} />
    </>
  )
}

export default App
