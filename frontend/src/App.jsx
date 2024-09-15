import { useContext, useState } from 'react'
import './login.css'
import { Outlet } from 'react-router-dom'
import { SuapContext } from './context/SuapContext'

function App() {
  const {suap} = useContext(SuapContext)

  return (
    <>
      {suap.isAuthenticated() ?
          <Outlet />
      :
      <div class="wrapper">
        <form action="">
            <div class="div-logo">
                <img class="logo" src="AppAreceu Logo.png" />
            </div>
            <h1 class="titulo">AppAreceu?</h1>
            <div class="input-box">
                <input type="text" placeholder="Matrícula" required maxLength={14}/>
                <span class="material-symbols-outlined">person</span>
            </div>
            <div class="input-box">
                <input type="password" id='senha' name='senha' placeholder="Senha" required />
                <span class="material-symbols-outlined">lock</span>
            </div>
            <button type="submit" class="botao-logar">Entrar</button>
            <p class="esqueceu-senha"><a href="#">Esqueceu a senha?</a></p>
        </form>
        <a href={suap.getLoginURL()}>
          Autorizar
        </a>
      </div>
      }
    </>
  )
}

export default App
