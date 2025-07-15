"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useTheme } from "../contexts/ThemeContext.tsx"
import "./Navbar.css"

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

interface NavbarProps {
  user: User | null
  onLogout: () => void
  isAuthenticated?: boolean
}

interface NavItem {
  path: string
  label: string
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, isAuthenticated = false }) => {
  const location = useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)
  const { isDarkMode, toggleDarkMode } = useTheme()

  const navItems: NavItem[] = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/competitive", label: "Competitive" },
    { path: "/chat", label: "AI Tutor" },
    { path: "/profile", label: "Profile" },
  ]

  // If not authenticated, show simple navbar
  if (!isAuthenticated || !user) {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              evo<span className="logo-accent">Code</span>
            </motion.div>
          </Link>

          <div className="nav-actions">
            <Link to="/login" className="get-started-link">
              <motion.button className="get-started-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            evo<span className="logo-accent">Code</span>
          </motion.div>
        </Link>

        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-user">          
          <div className="user-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <span className="user-name">{user.name}</span>
            <span className="dropdown-arrow">▼</span>

            {isProfileOpen && (
              <motion.div
                className="profile-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <div className="dropdown-item" onClick={toggleDarkMode}>
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </div>
                <div className="dropdown-item" onClick={onLogout}>
                  Logout
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
