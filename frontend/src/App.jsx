import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SuapContext } from './context/SuapContext'
import { UsuarioContext } from './context/UsuarioContext'
import Login from './components/Login'

function App() {
  const {suap} = useContext(SuapContext)
  const {usuario, setUsuario} = useContext(UsuarioContext)

  console.log(usuario)

  function carregarUsuario() {
    console.log(localStorage.length)

    if (localStorage.length > 3) {
      setUsuario({
        matricula: localStorage.getItem('matricula'),
        nome: localStorage.getItem('nome'),
        email: localStorage.getItem('email'),
        senha: localStorage.getItem('senha'),
        adm: localStorage.getItem('adm')
      })
    } else if (localStorage.length > 0) {
      setUsuario({
        email: localStorage.getItem('email'),
        senha: localStorage.getItem('senha'),
        adm: localStorage.getItem('adm')
      })
    }
    
  }

  useEffect(() => {
    carregarUsuario()
  }, [])

  return (
    <>
      {suap.isAuthenticated() || usuario.email ?
        <Outlet />
      :
        <Login />
      }
    </>
  )
}

export default App
