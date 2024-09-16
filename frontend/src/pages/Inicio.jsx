import { useState, useContext, useEffect,  } from 'react'
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'

function Inicio() {
    const {suap} = useContext(SuapContext)
    const {usuario, setUsuario} = useContext(UsuarioContext)

    async function criarUsuario(e){
      e.preventDefault()

      let senhaValida = VerificaSenhas(senha.value, senhaConfirmada.value)

      if (senhaValida) {
        const dados = await suap.getResource()
        console.log(usuario)

        setUsuario({
            nome: dados.nome,
            matricula: dados.identificacao,
            email: dados.email_secundario,
            senha: senha.value,
            adm: 0
        })

        await fetch('http://localhost:3000/usuarios/aluno', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'nome': dados.nome,
            'matricula': dados.identificacao,
            'email': dados.email_secundario,
            'senha': senha.value
          })
        }).then(dados => dados.json())
      } else {
        alert('As senhas não são iguais!')
      }
      
    }

  function VerificaSenhas(senha, confirmacaoSenha) {
    if (senha == confirmacaoSenha) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {usuario.email ?
        <div className="card">
          <h1>Olá {usuario.nome}</h1>
          <p>Matrícula: {usuario.matricula}</p>
          <p>Email: {usuario.email}</p>
        </div> 
      :
      <div className="wrapper">
        <form onSubmit={criarUsuario} method='post'>
            <h1 className="titulo">Digite uma nova senha</h1>
            <div className="input-box">
                <input type="password" id='senha' placeholder="Senha" required />
                <span className="material-symbols-outlined">lock</span>
            </div>
            <div className="input-box">
                <input type="password" id='senhaConfirmada' placeholder="Confirmar senha" required />
                <span className="material-symbols-outlined">lock</span>
            </div>
            <button type="submit" className="botao-logar">Confirmar</button>
        </form>
      </div>
      } 
    </>
  )
}

export default Inicio