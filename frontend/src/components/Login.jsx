import { useContext, useState } from 'react'
import './login.css'
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'

function Login() {
  const { suap } = useContext(SuapContext)
  const { usuario, setUsuario } = useContext(UsuarioContext)

  const [modal, setModal] = useState(false)
  const [modo, setModo] = useState({
    adm: false,
    url: 'http://localhost:3000/usuarios/aluno/login',
    tamanhoInput: 14
  })

  function persistirUsuarioTemp(usuario) {
    localStorage.setItem('email', usuario.email)
    localStorage.setItem('senha', usuario.senha)
    localStorage.setItem('adm', usuario.adm)

    if (usuario.matricula) {
      localStorage.setItem('matricula', usuario.matricula)
      localStorage.setItem('nome', usuario.nome)
    }
  }

  function modoAdministrador() {
    if (!modo.adm) {
      setModo({
        adm: true,
        url: 'http://localhost:3000/usuarios/adm/login',
        tamanhoInput: 250
      })
    } else {
      setModo({
        adm: false,
        url: 'http://localhost:3000/usuarios/aluno/login',
        tamanhoInput: 14
      })
    }

  }

  async function fazerLogin(e) {
    e.preventDefault()

    let corpo = {}

    if (modo.adm) {
      corpo = {
        'email': identificacao.value,
        'senha': senha.value
      }
    } else {
      corpo = {
        'matricula': identificacao.value,
        'senha': senha.value
      }
    }

    let header = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo)
    }

    const aluno = await fetch(modo.url, header)
      .then(dados => dados.json())

    if (aluno) {
      if (aluno.matricula) {
        setUsuario({
          matricula: aluno.matricula,
          nome: aluno.nome,
          email: aluno.email,
          senha: aluno.senha,
          adm: aluno.adm
        })
      } else {
        setUsuario({
          email: aluno.email,
          senha: aluno.senha,
          adm: aluno.adm
        })
      }
      persistirUsuarioTemp(aluno)
    } else {
      setModal(true)
    }

  }

  return (
    <>
      {modal &&
        <div id='centralizarModal'>
          <div id='modal'>
            <p>Dados incorretos ou usuário não cadastrado, deseja cadastrar-se via SUAP? </p>
            <button className="botao-modal" onClick={() => suap.login()}>Cadastro via SUAP</button>
            <button className='botao-modal' onClick={() => setModal(false)}>Tentar Novamente</button>
          </div>
        </div>
      }
      <div id='mainLogin'>
        <div className="wrapper">
          <form onSubmit={fazerLogin} method='post'>
            <div className="div-logo">
              <img className="logo" src="AppAreceu Logo.png" />
            </div>
            <h1 className="titulo">AppAreceu?</h1>
            <div className="input-box">
              <input type="text" id='identificacao' name='identificacao' placeholder={modo.adm ? 'Email' : 'Matrícula'} required maxLength={modo.tamanhoInput} />
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="input-box">
              <input type="password" id='senha' name='senha' placeholder="Senha" required />
              <span className="material-symbols-outlined">lock</span>
            </div>
            <div>
              <input type="checkbox" name="adm" id="adm" onClick={modoAdministrador} />
              <label htmlFor='adm'>Administrador</label>
            </div>
            <button type="submit" className="botao-logar">Entrar</button>
            <p className="esqueceu-senha"><a href="#">Esqueceu a senha?</a></p>
          </form>
        </div>
      </div>

    </>
  )
}

export default Login