import { useState } from 'react'
import MainForm from './comps/MainForm'
import './App.css'
import Header from './comps/Header'
import Footer from './comps/Footer'


function App() {
  return (
    <>
    <div className="w-full h-full justify-center">
      <Header/>
      <MainForm/>
      <Footer/>
    </div>
    </>
  )
}

export default App
