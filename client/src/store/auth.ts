import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type States = {
    token: string,
    isAuth: boolean
}

type Actions = {
    setToken: (token: string) => void,
    logout: () => void
}


export const useAuthStore = create(persist<States & Actions>(
    set => ({
        token: '',
        isAuth: false,
        setToken: (token: string) => set(state => ({
            token,
            isAuth: true
        })),
        logout: () => set(state => ({
            token: '',
            isAuth: false,
        }))
    }),
    {
        name: 'auth'
    }
))