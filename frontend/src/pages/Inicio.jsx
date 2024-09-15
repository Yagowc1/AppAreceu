import { useState, useContext, useEffect,  } from 'react'
import { SuapContext } from '../context/SuapContext'
import { UsuarioContext } from '../context/UsuarioContext'

function Inicio() {
    const {suap} = useContext(SuapContext)
    const {usuario, setUsuario} = useContext(UsuarioContext)

    async function pegarDados(){
        const dados = await suap.getResource()
        console.log(usuario)

        setUsuario({
            nome: dados.nome,
            matricula: dados.identificacao,
            email: dados.email_secundario
        })
    }

    // useEffect(() => {
    //     pegarDados()
    // }, [])
  return (
    <>
      <div className="card">
        <h1>Olá {usuario.nome}</h1>
        <p>Matrícula: {usuario.matricula}</p>
        <p>Email: {usuario.email}</p>
      </div>  
    </>
  )
}

export default Inicio