import { useParams } from 'react-router-dom'; // Importar useParams
import { useState, useEffect } from 'react';
import "./abrirChamado.css"; // Importando o CSS

function AtualizarItem() {
  const { id } = useParams(); // Acessando o id da URL
  const [tipoItem, setTipoItem] = useState('achado');
  const [matricula, setMatricula] = useState([]);

  async function abrirChamado(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const img = document.getElementById('img').files[0];
    const data = document.getElementById('data').value;
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;

    const chamadoData = {
      id: id, // Incluindo o id do item
      nome: nome,
      imagem: img ? img.name : null,
      data: data,
      categoria: categoria,
      descricao: descricao,
      status_obj: tipoItem,
      matricula: matricula
    };

    // Exibe os dados no console
    console.log(chamadoData);

    // Envia os dados para o servidor
    try {
      const response = await fetch(`http://localhost:3000/itens/item/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chamadoData),
      });

      if (response.ok) {
        const result = await response.text();
        console.log('Resposta do servidor:', result);
        alert('Atualizado com sucesso');
      } else {
        console.error('Erro ao enviar dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/itens/item/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const result = await response.json();
        console.log(result[0].matricula)
        setMatricula(result[0].matricula)
      } catch (err) {
        console.log('erro, bro ', err)
      }
    };

    fetchData();
  }, [id]);

  function selecionarTipo(tipo) {
    setTipoItem(tipo);
  }

  function selecionarTipoMudarCor(tipo) {
    let achados = document.getElementById('botaoAchados')
    let perdidos = document.getElementById('botaoPerdidos')
    let todos = document.getElementById('botaoTodos')

    if (tipo == 'achados') {
      achados.classList.add('selecionado')
      perdidos.classList.remove('selecionado')
    } else if (tipo == 'perdidos') {
      perdidos.classList.add('selecionado')
      achados.classList.remove('selecionado')
    } else {
      perdidos.classList.remove('selecionado')
      achados.classList.remove('selecionado')
    }
    
    selecionarTipo(tipo)
  }


  return (
    <>
      <div>
        <div className="header-container">
          <header className="header">
            <a href="/"><b>Home</b></a>
          </header>
        </div>

        <main className='main'>
          <h1>Atualizando o item!</h1>

          <form onSubmit={abrirChamado} className='form'>
            <div className="flex">
              <div className="input-box">
                <label htmlFor="nome">Nome do item:</label><br />
                <input type="text" id="nome" placeholder="exemplo: Garrafa da tupperware" />
              </div>

              <div className="input-box img-flex">
                <label htmlFor="img" id="labelImg">Selecionar imagem</label><br />
                <input type="file" id="img" />
              </div>
            </div>

            <div className="flex">
              <div className="input-box">
                <label htmlFor="data">Data que o item foi achado/perdido:</label><br />
                <input type="date" id="data" />
              </div>

              <div className="input-box">
                <label htmlFor="categoria">Categoria do item:</label><br />
                <select id="categoria" defaultValue='outro'>
                  <option value="outros" disabled>Selecione a categoria</option>
                  <option value="celulares">celular</option>
                  <option value="oculos">óculos</option>
                  <option value="livros">livro</option>
                  <option value="documentos">documento</option>
                  <option value="bolsas">bolsa</option>
                  <option value="garrafas">garrafa</option>
                  <option value="outros">outro</option>
                </select>
              </div>
            </div>

            <div className="input-box">
              <label htmlFor="descricao">Descrição do item:</label><br />
              <textarea id="descricao" placeholder="exemplo: A garrafa é amarela e tem uma rachadura na parte de cima da tampa."></textarea>
            </div>

            <div className="switch-flex">
              <button id='botaoAchados'
                className={`switch-item`}
                type='button'
                onClick={() => selecionarTipoMudarCor('achados')}
              >
                Achados
              </button>

              <button id='botaoPerdidos'
                className={`switch-item`}
                type='button'
                onClick={() => selecionarTipoMudarCor('perdidos')}
              >
                Perdidos
              </button>
            </div>

            <div className="div-botao">
              <button className="botao-enviar" type='submit'>Enviar</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default AtualizarItem;
