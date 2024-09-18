import { useContext, useEffect, useState } from 'react';
import "./abrirChamado.css"; // Importando o CSS
import axios from 'axios'
import { UsuarioContext } from '../context/UsuarioContext';

function AbrirChamado() {
  const [tipoItem, setTipoItem] = useState('achados');
  const { usuario, setUsuario } = useContext(UsuarioContext)

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
      matricula: usuario.matricula,
      imagem: img,
      data: data,
      categoria: categoria,
      descricao: descricao,
      status_obj: tipoItem
    };

    // Exibe os dados no console
    console.log("chamadoData:", chamadoData)

    //   // Envia os dados para o servidor
    //   try {
    //     const response = await fetch('http://localhost:3000/itens/item', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(chamadoData),
    //     })

    //     if (response.ok) {
    //       const result = await response.text();
    //       console.log('Resposta do servidor:', result);
    //       // alert('Cadastrado com sucesso')
    //       const chamadoDataLog = {
    //         item: result.id,
    //         tipo_chamado: tipoItem,
    //         responsavel: String,
    //         datetime: { type: Date, default: Date.now }
    //       }
    //     } else {
    //       console.error('Erro ao enviar dados:', response.statusText);
    //     }
    //   }
    //   catch (error) {
    //     console.error('Erro na requisição:', error);
    //   }
    // }

    // Envia os dados para o servidor MySQL
    try {
      const response = await fetch('http://localhost:3000/itens/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chamadoData),
      });

      if (response.ok) {
        const result = await response.json(); // Pegue a resposta como JSON, assumindo que a resposta contém { id: ... }
        console.log('Resposta do servidor:', result);
        alert("A inserção foi um sucesso!")

        // Dados para o log
        const chamadoDataLog = {
          item: result.id,  // ID retornado do MySQL
          tipo_chamado: tipoItem,  // Tipo de operação (achado, devolvido, perdido, etc.)
          responsavel: localStorage.getItem('email'),  // Substitua pelo nome ou ID do responsável
          datetime: new Date().toISOString()  // Data atual no formato ISO
        };

        // Envia o log para o MongoDB
        const logResponse = await fetch('http://localhost:3000/itens/logs/novo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chamadoDataLog),
        });

        if (logResponse.ok) {
          console.log('Log enviado com sucesso');
        } else {
          console.error('Erro ao enviar log:', logResponse.statusText);
        }
      } else {
        console.error('Erro ao enviar dados:', response.statusText);
      }
    }
    catch (error) {
      console.error('Erro na requisição:', error);
    }

    window.location.href = '/'
  }

  function selecionarTipo(tipo) {
    setTipoItem(tipo);
  }

  function selecionarTipoMudarCor(tipo) {
    let achados = document.getElementById('botaoAchados')
    let perdidos = document.getElementById('botaoPerdidos')
    

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
            <a href="/"><img src="AppAreceu Logo.png" className="logo" alt="Logo"></img></a>
          </header>
        </div>

        <main className='main'>
          <h1>Crie um novo chamado!</h1>

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
  )
}

export default AbrirChamado;
