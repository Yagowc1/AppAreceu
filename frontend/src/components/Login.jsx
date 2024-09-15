import { useContext, useState } from 'react'
import './login.css'
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'

function Login() {
  const {suap} = useContext(SuapContext)
  const {usuario, setUsuario} = useContext(UsuarioContext)

  const [modal, setModal] = useState(false)

  function persistirUsuarioTemp(usuario) {
    localStorage.setItem('email', usuario.email)
    localStorage.setItem('senha', usuario.senha)
    localStorage.setItem('adm', usuario.adm)
    
    if (usuario.matricula) {
      localStorage.setItem('matricula', usuario.matricula)
      localStorage.setItem('nome', usuario.nome)
    }
  }

  async function fazerLogin(e) {
    e.preventDefault()

    const aluno = await fetch('http://localhost:3000/usuarios/aluno/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'matricula': identificacao.value,
        'senha': senha.value
      })
    }).then(dados => dados.json())

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
      console.log(modal)
    }
    
  }

  return (
    <>
      {modal && 
        <div id='modal'>
          <p>Dados incorretos ou usuário não cadastrado, deseja logar via SUAP? </p>
          <button className="botao-modal" onClick={() => suap.login()}>Login via SUAP</button>
          <button className='botao-modal' onClick={() => setModal(false)}>Tentar Novamente</button>
        </div>
      }
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
      </div>
    </>
  )
}

export default Login