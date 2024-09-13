import { createContext, useState } from 'react'

const clienteSuap =  new SuapClient(SUAP_URL, CLIENT_ID, REDIRECT_URI, SCOPE)

async function autenticarUsuario() {
    clienteSuap.init()
    const v = clienteSuap.isAuthenticated()
    console.log(v)
  }

autenticarUsuario()

export const SuapContext = createContext()

export const SuapProvider = ({children}) => {
    const [suap, setSuap] = useState(clienteSuap)

    return (
        <SuapContext.Provider value={{suap, setSuap}}>
            {children}
        </SuapContext.Provider>
    )
}