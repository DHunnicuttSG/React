import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import ToggleMe from './components/ToggleButtonExercise'
import MyForm from './components/FormSubmit'
import PicGallery from './components/PicGalleryExercise'
import LoginControl from './components/LoginControl'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')



  return (
    <>
      <LoginControl/>
    </>
  )
}

export default App
