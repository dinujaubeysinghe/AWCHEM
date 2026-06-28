import { createContext, useContext } from 'react'

export const AuthContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

export const useAuth = () => useContext(AuthContext)
