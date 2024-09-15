import { useContext } from 'react'
import './login.css'
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'

function Login() {
  const {suap} = useContext(SuapContext)
  const {usuario, setUsuario} = useContext(UsuarioContext)


  return (
    <>
      <div className="wrapper">
        <form onSubmit={fazerLogin} method='post'>
          <div className="div-logo">
            <img className="logo" src="AppAreceu Logo.png" />
          </div>
          <h1 className="titulo">AppAreceu?</h1>
          <div className="input-box">
            <input type="text" id='identificacao' name='identificacao' placeholder="Matrícula" required maxLength={14}/>
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="input-box">
            <input type="password" id='senha' name='senha' placeholder="Senha" required />
            <span className="material-symbols-outlined">lock</span>
          </div>
          <button type="submit" className="botao-logar">Entrar</button>
          <p className="esqueceu-senha"><a href="#">Esqueceu a senha?</a></p>
        </form>
        <a href={suap.getLoginURL()}>
            Autorizar
        </a>
      </div>
    </>
  )
}

export default Login