import { useEffect, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [notifications, _setNotifications] = useState('')
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const notificationTimeoutRef = useRef(null)

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        }else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setNotifications = (notifications) => {
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current)
        }

        _setNotifications(notifications)
        notificationTimeoutRef.current = setTimeout(() => {
            _setNotifications('')
        }, 5000)

    }

    useEffect(() => {
        return () => {
            if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current)
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notifications,
            setNotifications
        }}>
            {children}
        </AuthContext.Provider>
    )
}