import { useLocation, useNavigate } from 'react-router-dom'; // Importar useLocation e useNavigate
import { useEffect, useState } from 'react'
import "./visualizarItem.css"; // Importando o CSS

function VisualizarItem() {
  const location = useLocation(); // Acessando os dados passados via state
  const { item } = location.state || {}; // Desestruturar o item passado pelo state
  const [email, setEmail] = useState([]);
  const navigate = useNavigate(); // Navegação

  // Função para logout
  function logoutUsuario() {
    localStorage.clear();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/itens/item/email/${item.id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const result = await response.json();
        console.log(result)
        setEmail(result[0].email)
      } catch (err) {
        console.log('erro, bro ', err)
      }
    };

    fetchData();
  }, [item]);

  return (
    <>
      <div>
        <div className="header-container">
          <header className="header">
            <a href="/"><img src="AppAreceu Logo.png" className="logo" alt="Logo"></img></a>
            <nav className="navbar">
              <a href="#"><span className="material-icons ajuda">help_outline</span></a>
              <a href="/" onClick={logoutUsuario}>sair</a>
              <button className="botao-chamado">abrir chamado</button>
            </nav>
          </header>
        </div>

        <main id='main-visualizaritem'>
          <div className="imagem">
            {/* Exibindo a imagem do item */}
            <img src={"banana.png"} alt={item.nome}></img>
          </div>
          <div className="info">
            {/* Exibindo as informações do item */}
            <h1>{item.nome}</h1>
            <h2>Descrição do item</h2>
            <p>{item.descricao}</p>
            <h2>Informação para contato</h2>
            <p><b>Email:</b> {email}</p>
            <div className="botao-flex">
              <button onClick={() => navigate(`/atualizarItem/${item.id}`)}>Atualizar</button>
              <button>Deletar</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default VisualizarItem;
