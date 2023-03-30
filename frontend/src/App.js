import React from 'react'
import './App.css'
import Routing from './views/Routing'
import Header from './components/SharedComponents/Header/Header'
import Footer from './components/SharedComponents/Footer/Footer'
function App() {
  return <Routing header={<Header />} footer={<Footer />} />
}

export default App
