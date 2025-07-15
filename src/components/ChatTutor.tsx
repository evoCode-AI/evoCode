"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./ChatTutor.css"

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

interface ChatTutorProps {
  user: User
}

interface Message {
  id: number
  type: "ai" | "user"
  content: string
  timestamp: Date
}

interface QuickAction {
  text: string
  icon: string
}

const ChatTutor: React.FC<ChatTutorProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI coding tutor. I'm here to help you learn and solve coding problems. What would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const aiResponse = generateAIResponse(inputValue)
      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "Great question! Let me help you understand this concept step by step...",
      "I see you're working on this problem. Here's a hint to get you started...",
      "That's a common challenge! Let's break it down together...",
      "Excellent progress! Here's how you can improve your solution...",
      "I notice you might be stuck. Let me provide some guidance...",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const quickActions: QuickAction[] = [
    { text: "Explain this code", icon: "🔍" },
    { text: "Find the bug", icon: "🐛" },
    { text: "Optimize solution", icon: "⚡" },
    { text: "Practice problems", icon: "💪" },
  ]

  return (
    <div className="chat-tutor">
      <div className="chat-header">
        <motion.div
          className="tutor-info"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="tutor-avatar">🤖</div>
          <div className="tutor-details">
            <h2>AI Coding Tutor</h2>
            <span className="status">Online • Ready to help</span>
          </div>
        </motion.div>

        <motion.div
          className="chat-stats"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat">
            <span>Session: 25 min</span>
          </div>
          <div className="stat">
            <span>Problems Solved: 3</span>
          </div>
        </motion.div>
      </div>

      <div className="chat-container">
        <div className="messages-area">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.type}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-avatar">{message.type === "ai" ? "🤖" : "👤"}</div>
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div className="message ai typing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                className="quick-action"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInputValue(action.text)}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-text">{action.text}</span>
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="input-form">
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about coding..."
                className="message-input"
              />
              <motion.button
                type="submit"
                className="send-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
              >
                <span>Send</span>
                <span className="send-icon">📤</span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      <div className="chat-sidebar">
        <motion.div
          className="help-topics"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Popular Topics</h3>
          <div className="topics-list">
            <div className="topic-item">Variables & Data Types</div>
            <div className="topic-item">Functions & Methods</div>
            <div className="topic-item">Loops & Conditionals</div>
            <div className="topic-item">Debugging Tips</div>
            <div className="topic-item">Best Practices</div>
          </div>
        </motion.div>

        <motion.div
          className="session-progress"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3>Session Progress</h3>
          <div className="progress-item">
            <span>Questions Asked</span>
            <span className="progress-value">8</span>
          </div>
          <div className="progress-item">
            <span>Concepts Learned</span>
            <span className="progress-value">3</span>
          </div>
          <div className="progress-item">
            <span>XP Earned</span>
            <span className="progress-value">+45</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatTutor
