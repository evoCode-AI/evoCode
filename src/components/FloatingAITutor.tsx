"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./FloatingAITutor.css"

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

interface FloatingAITutorProps {
  user: User
}

interface Message {
  id: number
  type: "ai" | "user"
  content: string
  timestamp: Date
}

const FloatingAITutor: React.FC<FloatingAITutorProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: `Hi ${user.name}! 👋 I'm your AI coding assistant. How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateQuickResponse(inputValue)
      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const generateQuickResponse = (input: string): string => {
    const responses = [
      "Great question! Let me help you with that concept.",
      "I can see you're working on something challenging. Here's a hint...",
      "That's a common problem in competitive programming. Try this approach...",
      "Excellent! You're making good progress. Keep it up!",
      "Let me break this down step by step for you.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const quickActions = [
    { text: "Explain algorithm", icon: "🧠" },
    { text: "Debug my code", icon: "🐛" },
    { text: "Optimize solution", icon: "⚡" },
    { text: "Practice hints", icon: "💡" },
  ]

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="floating-ai-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? "#ef4444" : "#6366f1",
        }}
      >
        <span className="ai-icon">{isOpen ? "✕" : "🤖"}</span>
        <div className="pulse-ring"></div>
      </motion.div>

      {/* Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-chat-container"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chat-header">
              <div className="ai-avatar">🤖</div>
              <div className="ai-info">
                <h4>AI Tutor</h4>
                <span className="status">Online</span>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="message ai typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  className="quick-action"
                  onClick={() => setInputValue(action.text)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-text">{action.text}</span>
                </motion.button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="input-field"
              />
              <motion.button
                type="submit"
                className="send-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
              >
                📤
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingAITutor
