import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'
import "./inicio.css";

function Inicio() {
  const { suap } = useContext(SuapContext)
  const { usuario, setUsuario } = useContext(UsuarioContext)

  const [tipoItem, setTipoItem] = useState('achados');
  const [tipoCategoria, setTipoCategoria] = useState('celulares');

  const [items, setItems] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const navigate = useNavigate(); 

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

  // useEffect(()=> {
  //   console.log(tipoItem);
  //   console.log(tipoCategoria);

  //   const response = fetch(`http://localhost:3000/itens/itens/${tipoItem}/${tipoCategoria}`);  

  //   console.log(response.json)
  // }, [tipoCategoria, tipoItem]);

  function selecionarTipo(tipo) {
    setTipoItem(tipo);
  }

  function selecionarCategoria(tipo) {
    setTipoCategoria(tipo);
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log(tipoItem);
      console.log(tipoCategoria);

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/itens/itens/${tipoItem}/${tipoCategoria}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const result = await response.json();
        setData(result);
        console.log(result)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tipoItem, tipoCategoria]);

  function logoutUsuario() {
    localStorage.clear()
  }

  // Função para navegar para a página de visualização com os dados do item
  const visualizarItem = (item) => {
    navigate('/visualizarItem', { state: { item } });
  };

  return (
    <>
      {usuario.email ?
        <div>
          <div className="header-container">
            <header className="header">
              <a href="#"><img src="AppAreceu Logo.png" className="logo"></img></a>

              <nav className="navbar">
                <a href="#"><span className="material-icons ajuda">help_outline</span></a>
                <a href="/" onClick={logoutUsuario}>sair</a>
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
                onClick={() => selecionarTipo('achados')}
              >achados</button>
              <button className="switch-item" type='button'
                onClick={() => selecionarTipo('perdidos')}
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

            {/* <div className="lista-grid">
              {data.map(item => (
                <div key={item.id} className="lista-item">
                  <a href="/visualizarItem">
                    <img src='banana.png' alt={item.nome} />
                    <p>{item.nome}</p>
                    <p>{item.descricao}</p>
                  </a>
                </div>
              ))}
            </div> */}

            <div className="lista-grid">
              {data.map(item => (
                <div key={item.id} className="lista-item" onClick={() => visualizarItem(item)}>
                  <img src={'banana.png'} alt={item.nome} />
                  <p>{item.nome}</p>
                  <p>{item.descricao}</p>
                </div>
              ))}
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