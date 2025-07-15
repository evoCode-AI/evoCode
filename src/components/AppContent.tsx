"use client"

import type React from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import LandingPage from "./LandingPage.tsx"
import LoginPage from "./LoginPage.tsx"
import Dashboard from "./Dashboard.tsx"
import LearningPath from "./LearningPath.tsx"
import ChatTutor from "./ChatTutor.tsx"
import Profile from "./Profile.tsx"
import CompetitiveCoding from "./CompetitiveCoding.tsx"
import Navbar from "./Navbar.tsx"
import FloatingAITutor from "./FloatingAITutor.tsx"
import ProblemSolver from "./ProblemSolver.tsx"
import Lesson from "./Lesson.tsx"

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

interface AppContentProps {
  user: User | null
  isAuthenticated: boolean
  onLogin: (userData: User) => void
  onLogout: () => void
}

const AppContent: React.FC<AppContentProps> = ({ user, isAuthenticated, onLogin, onLogout }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="App">
      {/* Show navbar on all pages except login */}
      {location.pathname !== "/login" && <Navbar user={user} onLogout={onLogout} isAuthenticated={isAuthenticated} />}
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage onLogin={onLogin} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated && user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/learning/:language"
          element={isAuthenticated && user ? <LearningPath user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chat"
          element={isAuthenticated && user ? <ChatTutor user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/competitive"
          element={isAuthenticated && user ? <CompetitiveCoding user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isAuthenticated && user ? <Profile user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/problem/:problemId"
          element={isAuthenticated && user ? <ProblemSolver user={user} /> : <Navigate to="/login" replace />}
        />
      </Routes>
      {/* Only show floating AI tutor on authenticated pages except chat page and problemsolver page */}
      {isAuthenticated && user && location.pathname !== "/chat" && <FloatingAITutor user={user} />}
      </div>
  )
}

export default AppContent
