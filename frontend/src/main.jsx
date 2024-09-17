import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import AbrirChamado from './pages/AbrirChamado.jsx'
import { SuapProvider } from './context/SuapContext.jsx'
import { UsuarioProvider } from './context/UsuarioContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SuapProvider>
    <UsuarioProvider>
      <BrowserRouter>
        <Routes>
            <Route element={<App />}>
              <Route path='/' element={<Inicio />}></Route>
              <Route path='/abrirchamado' element={<AbrirChamado />}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
    </SuapProvider>
  </StrictMode>
)
