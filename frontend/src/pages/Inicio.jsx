import { useState, useContext, useEffect } from 'react'
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'
import "./inicio.css";

function Inicio() {
  const { suap } = useContext(SuapContext)
  const { usuario, setUsuario } = useContext(UsuarioContext)

  const [tipoItem, setTipoItem] = useState('achado');
  const [tipoCategoria, setTipoCategoria] = useState('celulares');

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

  async function criarAluno() {
    await fetch('http://localhost:3000/usuarios/aluno', {
      method: 'POST',
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
      method: 'PUT',
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

  function selecionarTipo(tipo) {
    setTipoItem(tipo);
    console.log(tipo)
  }

  function selecionarCategoria(tipo) {
    setTipoCategoria(tipo);
    console.log(tipo)
  }

  const itens = [
    { id: 1, nome: 'Item 1', categoria: 'celulares', tipo: 'achados' },
    { id: 2, nome: 'Item 2', categoria: 'óculos', tipo: 'perdidos' },
    { id: 3, nome: 'Item 3', categoria: 'livros', tipo: 'achados' },
    { id: 4, nome: 'Item 4', categoria: 'documentos', tipo: 'perdidos' },
    // Adicione mais itens aqui
  ]

  return (
    <>
      {usuario.email ?
        <div>
           <div className="header-container">
            <header className="header">
              <a href="#"><img src="AppAreceu Logo.png" className="logo"></img></a>

              <nav className="navbar">
                <a href="#"><span className="material-icons ajuda">help_outline</span></a>
                <a href="#">sair</a>
                <a href="/abrirChamado">
                <button className="botao-chamado">abrir chamado</button>
                </a>
                
              </nav>
            </header>
          </div>

          <main className="main">
            <div id="switch-flex-ajustado">
              <button className="switch-item selecionado" 
              type='button' 
              onClick={() => selecionarTipo('achado')}
              >achados</button>
              <button className="switch-item" type='button' 
              onClick={() => selecionarTipo('perdido')}
              >perdidos</button>
              <button className="switch-item" type='button'
              onClick={() => selecionarTipo('todos')}
              >todos</button>
            </div>
            <div className="categorias-flex">
              <div className="categorias-item" onClick={() => selecionarCategoria('celulares')}>
                <div className="container-img">
                  <img src="celulares.png"></img>
                </div>
                <p>celulares</p>
              </div>
              <div className="categorias-item" onClick={() => selecionarCategoria('oculos')}>
                <div className="container-img">
                  <img src="óculos.png"></img>
                </div>
                <p>óculos</p>
              </div>
              <div className="categorias-item" onClick={() => selecionarCategoria('livros')}>
                <div className="container-img">
                  <img src="livros.png"></img>
                </div>
                <p>livros</p>
              </div>
              <div className="categorias-item" onClick={() => selecionarCategoria('documentos')}>
                <div className="container-img">
                  <img src="documentos.png"></img>
                </div>
                <p>documentos</p>
              </div>
              <div className="categorias-item" onClick={() => selecionarCategoria('bolsas')}>
                <div className="container-img">
                  <img src="bolsas.png"></img>
                </div>
                <p>bolsas</p>
              </div>
              <div className="categorias-item" onClick={() => selecionarCategoria('garrafas')}>
                <div className="container-img">
                  <img src="garrafas.png"></img>
                </div>
                <p>garrafas</p>
              </div>
              <div className="categorias-item" onClick={() => selecionarCategoria('outros')}>
                <div className="container-img">
                  <p>+</p>
                </div>
                <p>outros</p>
              </div>
            </div>

            <div className="lista-grid">
              <div className="lista-item">
                <a href="#">
                  <img src="banana.png"></img>
                    <p>Item 1</p>
                </a>
              </div>
              <div className="lista-item">
                <a href="#">
                  <img src="banana.png"></img>
                    <p>Item 1</p>
                </a>
              </div>
              <div className="lista-item">
                <a href="#">
                  <img src="banana.png"></img>
                    <p>Item 1</p>
                </a>
              </div>
              <div className="lista-item">
                <a href="#">
                  <img src="banana.png"></img>
                    <p>Item 1</p>
                </a>
              </div>
              <div className="lista-item">
                <a href="#">
                  <img src="banana.png"></img>
                    <p>Item 1</p>
                </a>
              </div>
              <div className="lista-item">
                <a href="#">
                  <img src="banana.png"></img>
                    <p>Item 1</p>
                </a>
              </div>
            </div>
          </main>
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