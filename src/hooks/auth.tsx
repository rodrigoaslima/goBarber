import React, { createContext, useCallback, useState, useContext } from 'react'
import Api from '../services/api'

interface SingInCredentials{
    email: string
    password: string
}


interface AuthContextData {
    user: object
    signIn(credentials: SingInCredentials): Promise<void>
    singAuth(): void

}

interface AuthState{
    token: string
    user: object
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>(() =>{
        const token = localStorage.getItem('@DigitalBank:token')
        const user = localStorage.getItem('@DigitalBank:user')

        if(token && user){
            return{ token, user: JSON.parse(user) }
        }

        return {} as AuthState
    })

    const signIn = useCallback(async ({email, password})=>{
        const response = await Api.post('sessions', {
            email,
            password
        })
        const { token, user } = response.data

        localStorage.setItem('@DigitalBank:token', token)
        localStorage.setItem('@DigitalBank:user', JSON.stringify(user))

        setData({token, user})

    }, [])

    const singAuth = useCallback(() =>{
        localStorage.removeItem('@DigitalBank:token')
        localStorage.removeItem('@DigitalBank:user')

        setData({} as AuthState)

    }, [])


    return (
        <AuthContext.Provider value={{user: data.user, signIn, singAuth}}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used within a AuthProvider')
    }

    return context
}