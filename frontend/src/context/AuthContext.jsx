import { createContext, useContext } from 'react'

export const AuthContext = createContext({
    user: null,
    token: null,
    notifications: null,
    setUser: () => {},
    setToken: () => {},
    setNotifications: () => {}
})

export const useAuth = () => useContext(AuthContext)
