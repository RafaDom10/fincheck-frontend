import { createContext, useCallback, useEffect, useState } from 'react'
import { localStorageKeys } from '../config/localStorageKeys'
import { useQuery } from '@tanstack/react-query'
import { usersService } from '../services/usersService'
import toast from 'react-hot-toast'
import { LaunchScreen } from '../../view/components/LaunchScreen'
import { User } from '../entities/User'

interface AuthContextValue {
  signedIn: boolean
  signin(accessToken: string): void
  signout(): void
  user: User | undefined
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToke = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    return !!storageAccessToke
  })

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => await usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)
    setSignedIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    setSignedIn(false)
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!')
      signout()
    }
  }, [isError, signout])

  return (
    <AuthContext.Provider value={{
      signedIn: isSuccess && signedIn,
      signin,
      signout,
      user: data
    }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  )
}
