"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import "./LoginPage.css"

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

interface LoginPageProps {
  onLogin: (userData: User) => void
}

interface FormData {
  email: string
  password: string
  name: string
  confirmPassword: string
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate login/signup
    const userData: User = {
      id: 1,
      name: formData.name || "Coding Enthusiast",
      email: formData.email,
      level: 1,
      xp: 0,
      streak: 0,
      badges: [],
      completedLessons: [],
    }
    onLogin(userData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-elements">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
            >
              {["<>", "{}", "[]", "()", "//", "&&"][i]}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <motion.h1
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            evo<span className="logo-accent">Code</span>
          </motion.h1>
          <p className="tagline">Master coding with AI-powered learning</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </motion.div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {isSignUp && (
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </motion.div>
          )}

          <motion.button type="submit" className="login-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isSignUp ? "Start Learning" : "Continue Learning"}
          </motion.button>
        </form>

        <div className="login-footer">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button type="button" className="toggle-btn" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
