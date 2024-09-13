import { useContext, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { SuapContext } from './context/SuapContext'

function App() {
  const {suap} = useContext(SuapContext)

  return (
    <>
      {suap.isAuthenticated() ?
          <Outlet />
      :
      <div className="card">
        <a href={suap.getLoginURL()}>
          Autorizar
        </a>
      </div>  
      }
    </>
  )
}

export default App
