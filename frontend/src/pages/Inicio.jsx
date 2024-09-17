import { useState, useContext, useEffect  } from 'react'
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'
import "./inicio.css"; // Importando o CSS

function Inicio() {
  const {suap} = useContext(SuapContext)
  const {usuario, setUsuario} = useContext(UsuarioContext)
  const [tipoItem, setTipoItem] = useState('achado');

  function persistirUsuarioTemp(usuario) {
    console.log('opa')
    localStorage.setItem('email', usuario.email)
    localStorage.setItem('senha', usuario.senha)
    localStorage.setItem('adm', usuario.adm)
    
    if (usuario.matricula) {
      localStorage.setItem('matricula', usuario.matricula)
      localStorage.setItem('nome', usuario.nome)
    }
  }

  async function criarAluno(){
    await fetch('http://localhost:3000/usuarios/aluno', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'nome': usuario.nome,
        'matricula': usuario.matricula,
        'email': usuario.email,
        'senha': usuario.senha
      })
    })

    persistirUsuarioTemp(usuario)
  }

  async function atualizarSenha() {
    await fetch(`http://localhost:3000/usuarios/aluno/${usuario.matricula}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'nome': usuario.nome,
        'email': usuario.email,
        'senha': usuario.senha
      })
    })

    persistirUsuarioTemp(usuario)
  }

  function VerificaSenhas(senha, confirmacaoSenha) {
    if (senha == confirmacaoSenha) {
      return true
    } else {
      return false
    }
  }

  async function verificaUsuarioExiste() {
    console.log(usuario)

    const alunoExiste = await fetch(`http://localhost:3000/usuarios/aluno/${usuario.matricula}`)
    .then(dados => dados.json())
    
    console.log(alunoExiste)

    if (alunoExiste.length > 0) {
      atualizarSenha()
    } else {
      criarAluno()
    }
  }

  async function pegarDados(e) {
    e.preventDefault()

    let senhaValida = VerificaSenhas(senha.value, senhaConfirmada.value)

    if (senhaValida) {
      const dados = await suap.getResource()
      console.log(dados.nome)

      setUsuario({
        nome: dados.nome,
        matricula: dados.identificacao,
        email: dados.email_secundario,
        senha: senha.value,
        adm: 0
      })
    } else {
      alert('As senhas não são iguais!')
    }
  }

  useEffect(() => {
    if (usuario.matricula && suap.isAuthenticated()) {
      verificaUsuarioExiste()
    }
  }, [usuario])

  return (
    <>
      {usuario.email ?
      <div>
        <h1>Oi</h1>
      </div>
        
      :

      <div className="wrapper">
        <form onSubmit={pegarDados} method='post'>
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