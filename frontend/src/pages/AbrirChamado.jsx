import { useState } from 'react';
import "./abrirChamado.css"; // Importando o CSS
import axios from 'axios'

function AbrirChamado() {
  const [tipoItem, setTipoItem] = useState('achado');

  async function abrirChamado(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const imagem = document.getElementById('img').files[0];
    let img = null
    const data = document.getElementById('data').value;
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;

    if (imagem) {
      const formData = new FormData()
      formData.append('img', imagem)
      img = await axios.post('http://localhost:3000/itens/upload', formData)
      img = img.data
    }

    const chamadoData = {
      nome: nome,
      imagem: img,
      data: data,
      categoria: categoria,
      descricao: descricao,
      status_obj: tipoItem
    };

    // Exibe os dados no console
    console.log("chamadoData:", chamadoData)

    // Envia os dados para o servidor
    try {
      const response = await fetch('http://localhost:3000/itens/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chamadoData),
      })

      if (response.ok) {
        const result = await response.text();
        console.log('Resposta do servidor:', result);
        alert('Cadastrado com sucesso')
      } else {
        console.error('Erro ao enviar dados:', response.statusText);
        }
      } 
    catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  function selecionarTipo(tipo) {
    setTipoItem(tipo);
  }

  return (
    <>
        <div>
            <div className="header-container">
              <header className="header">
                  <a href="/"><img src="AppAreceu Logo.png" className="logo" alt="Logo"></img></a>
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
                      <label htmlFor="img" id="labelImg">Selecionar imagem</label><br/>
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
                          <option value="outro" disabled>Selecione a categoria</option>
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
                    className={`switch-item`}
                    type='button'
                    onClick={() => selecionarTipo('achado')}
                  >
                    Achados
                  </button>

                  <button
                    className={`switch-item`}
                    type='button'
                    onClick={() => selecionarTipo('perdido')}
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
  )
}

export default AbrirChamado;
