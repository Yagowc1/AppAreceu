import { useState, useContext, useEffect  } from 'react'
import "./abrirChamado.css"; // Importando o CSS

function AbrirChamado() {

  const [tipoItem, setTipoItem] = useState('achado');

  function abrirChamado(e) {
    e.preventDefault();
    console.log('confia')

     // Coleta os valores dos inputs
    const nome = document.getElementById('nome').value;
    const img = document.getElementById('img').files[0]; // Para arquivos, usamos files[0]
    const data = document.getElementById('data').value;
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;

    // Cria um objeto FormData
    const formData = new FormData();
    formData.append('nome', nome);
    if (img) {
      formData.append('img', img);
    }
    formData.append('data', data);
    formData.append('categoria', categoria);
    formData.append('descricao', descricao);

    // Exibe os valores no console
    console.log('Dados do formulário:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(tipoItem)
  }

  function selecionarTipo(tipo) {
    setTipoItem(tipo);
  }

  return (
    <>
        <div>
            <div className="header-container">
              <header className="header">
                  <a href="#"><img src="AppAreceu Logo.png" className="logo"></img></a>
              </header>
            </div>

            <main className='main'>
              <h1>Crie um novo chamado!</h1>
              
              <form onSubmit={abrirChamado} className='form'>
                <div className="flex">
                  <div className="input-box">
                      <label htmlFor="nome">Nome do item:</label><br/>
                      <input type="text" id="nome" placeholder="exemplo: Garrafa da tupperware"/>
                  </div>

                  <div className="input-box img-flex">
                      <label htmlFor="img" id="labelImg">selecionar imagem</label><br/>
                      <input type="file" id="img"/>
                  </div>
                </div>

                <div className="flex">
                  <div className="input-box">
                      <label htmlFor="data">Data que o item foi achado/perdido:</label><br/>
                      <input type="date" id="data"/>
                  </div>

                  <div className="input-box">
                      <label htmlFor="categoria">Categoria do item:</label><br/>
                      <select id="categoria" defaultValue='outro'>
                          <option value="outro" disabled>selecione a catergoria</option>
                          <option value="celular">celular</option>
                          <option value="oculos">óculos</option>
                          <option value="livro">livro</option>
                          <option value="documento">documento</option>
                          <option value="bolsa">bolsa</option>
                          <option value="garrafa">garrafa</option>
                          <option value="outro">outro</option>
                      </select>
                  </div>
                </div>

                <div className="input-box">
                  <label htmlFor="descricao">Descrição do item:</label><br/>
                  <textarea id="descricao" placeholder="exemplo: A garrafa é amarela e tem uma rachadura na parte de cima da tampa."></textarea>
                </div>

                <div className="switch-flex">
                <button
                  className={`switch-item ${tipoItem === 'achado' ? 'selecionado' : ''}`}
                  type='button'
                  onClick={() => selecionarTipo('achado')}
                >
                  achados
                </button>

                <button
                  className={`switch-item ${tipoItem === 'perdido' ? 'selecionado' : ''}`}
                  type='button'
                  onClick={() => selecionarTipo('perdido')}
                >
                  perdidos
                </button>
              </div>


                <div className="div-botao">
                  <button className="botao-enviar" type='submit'>enviar</button>
                </div>

              </form>
            </main>
        </div>
    </>
  )
}

export default AbrirChamado