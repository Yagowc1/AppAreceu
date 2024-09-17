import { useLocation, useNavigate } from 'react-router-dom'; // Importar useLocation e useNavigate
import "./visualizarItem.css"; // Importando o CSS

function VisualizarItem() {
  const location = useLocation(); // Acessando os dados passados via state
  const navigate = useNavigate(); // Para navegações futuras
  const { item } = location.state || {}; // Desestruturar o item passado pelo state

  // Função para logout
  function logoutUsuario() {
    localStorage.clear();
  }

  // Verificação para garantir que o item exista antes de renderizar
  if (!item) {
    return <p>Item não encontrado. Por favor, retorne à página inicial.</p>;
  }

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
            <p><b>Email:</b> {item.emailContato || "Não informado"}</p>
            <p><b>Telefone:</b> {item.telefoneContato || "Não informado"}</p>
            <div className="botao-flex">
              <button onClick={() => navigate(`/editarItem/${item.id}`)}>Atualizar</button>
              <button>Deletar</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default VisualizarItem;
