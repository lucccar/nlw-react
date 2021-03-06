import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from 'react'

import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../services/api'
import { COLLECTION_USER } from '../configs/database'

const { REDIRECT_URI } = process.env
const { SCOPE } = process.env
const { RESPONSE_TYPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env

type User = {
    id: string
    username: string
    firstName: string
    avatar: string
    email: string
    token: string
}

type AuthContextData = {
    user: User
    loading: boolean
    signIn: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string
        error?: string
    }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)

    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

    async function signIn() {
        try {
            setLoading(true)

            const { type, params } = (await AuthSession.startAsync({
                authUrl,
            })) as AuthorizationResponse
            // console.log('params =>', params)
            if (type === 'success' && !params.error) {
                // console.log(type)
                api.defaults.headers.common[
                    'authorization'
                ] = `Bearer ${params.access_token}`
                const userInfo = await api.get('/users/@me', {
                    // headers: {
                    //     authorization: `Bearer ${params.access_token}`,
                    // },
                })

                const firstName = userInfo.data.username //.split(' ')[0]
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token,
                }

                await AsyncStorage.setItem(
                    COLLECTION_USER,
                    JSON.stringify(userData)
                )

                setUser(userData)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            throw new Error('N??o foi poss??vel autenticar.')
        } finally {
            setLoading(false)
        }
    }

    async function loadUserData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USER)
        if (storage) {
            const userLogged = JSON.parse(storage) as User
            // console.log(userLogged)
            api.defaults.headers.common[
                'authorization'
            ] = `Bearer ${userLogged.token}`

            setUser(userLogged)
        }
    }

    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider value={{ user, signIn, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }
