import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Uniswap from './pages/Uniswap'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Uniswap />
  </React.StrictMode>
)
