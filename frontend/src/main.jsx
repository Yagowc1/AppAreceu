import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import { SuapProvider } from './context/SuapContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SuapProvider>
    <BrowserRouter>
      <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Inicio />}></Route>
          </Route>
      </Routes>
    </BrowserRouter>
    </SuapProvider>
  </StrictMode>
)
