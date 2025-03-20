"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (token && storedUser) {
        setUser(JSON.parse(storedUser))
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      const token = localStorage.getItem("token")

      // If no token and trying to access protected route
      if (!token && pathname.startsWith("/dashboard")) {
        router.push("/login")
      }

      // If token and on login page
      if (token && pathname === "/login") {
        router.push("/dashboard")
      }
    }
  }, [isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll create a mock token and user
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation - in a real app, this would be server-side
        if (email && password.length >= 6) {
          const mockUser = {
            id: "1",
            name: email.split("@")[0],
            email,
          }

          // Create a mock JWT token
          const mockToken = `mock-jwt-token-${Date.now()}`

          // Store in localStorage
          localStorage.setItem("token", mockToken)
          localStorage.setItem("user", JSON.stringify(mockUser))

          setUser(mockUser)
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000) // Simulate network delay
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

