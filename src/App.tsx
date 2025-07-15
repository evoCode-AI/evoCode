"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext.tsx"
import "./App.css"
import AppContent from "./components/AppContent.tsx" // Ensure this import is correct

interface User {
  id: number
  name: string
  email: string
  level: number
  xp: number
  streak: number
  badges: string[]
  completedLessons: number[]
}

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("evoCodeUser")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("evoCodeUser")
      }
    }
  }, [])

  const handleLogin = (userData: User): void => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("evoCodeUser", JSON.stringify(userData))
  }

  const handleLogout = (): void => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("evoCodeUser")
  }

  return (
    <ThemeProvider>
      <Router>
        <AppContent user={user} isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
      </Router>
    </ThemeProvider>
  )
}

export default App
