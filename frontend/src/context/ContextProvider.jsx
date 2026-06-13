import {createContext, useContext, useState} from 'react'

const AuthContext = createContext({
    User: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

export const AuthProvider = ({ children }) => {
    const [User, setUser] = useState()
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        }else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    return (
        <AuthContext.Provider value={{
            User,
            token,
            setUser,
            setToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)