import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
import ScrollLinked from './pages/motion'




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/motion" element={<ScrollLinked />} />
    </Routes>
  )
}
