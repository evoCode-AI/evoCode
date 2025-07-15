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
      content: `Hello ${user.name}! 👋 I'm your AI coding tutor. I'm here to help you learn and solve coding problems. What would you like to work on today?`,
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
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("algorithm") || lowerInput.includes("explain")) {
      return "Great question! Let me break down this algorithm step by step:\n\n1. First, we need to understand the problem requirements\n2. Then we'll choose the right data structure\n3. Finally, we'll implement the solution efficiently\n\nWhich specific algorithm would you like me to explain in detail?"
    }

    if (lowerInput.includes("debug") || lowerInput.includes("error")) {
      return "I'd be happy to help you debug! 🐛\n\nTo better assist you, please share:\n• Your code snippet\n• The error message you're seeing\n• What you expected to happen\n\nCommon debugging strategies:\n✓ Check for syntax errors\n✓ Verify variable names\n✓ Test with simple inputs\n✓ Use print statements to trace execution"
    }

    if (lowerInput.includes("optimize")) {
      return "Optimization is key to writing efficient code! ⚡\n\nHere are some optimization techniques:\n\n🔹 **Time Complexity**: Use better algorithms (O(n) vs O(n²))\n🔹 **Space Complexity**: Minimize memory usage\n🔹 **Data Structures**: Choose the right one for your use case\n🔹 **Caching**: Store frequently used results\n\nWhat specific code would you like to optimize?"
    }

    return "That's an interesting question! I'm here to help you understand programming concepts, debug code, explain algorithms, and guide you through problem-solving. Could you provide more details about what you're working on? I can help with:\n\n• Code explanations and debugging\n• Algorithm design and optimization\n• Data structure selection\n• Best practices and patterns\n• Problem-solving strategies"
  }

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.text)
  }

  const quickActions: QuickAction[] = [
    { text: "Explain this algorithm", icon: "🧠" },
    { text: "Help me debug my code", icon: "🐛" },
    { text: "How to optimize this solution?", icon: "⚡" },
    { text: "What data structure should I use?", icon: "📊" },
    { text: "Explain time complexity", icon: "⏱️" },
    { text: "Show me best practices", icon: "✨" },
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="chat-tutor">
      <div className="chat-header">
        <div className="tutor-info">
          <div className="tutor-avatar">
            <span className="avatar-icon">🤖</span>
          </div>
          <div className="tutor-details">
            <h2>AI Coding Tutor</h2>
            <p className="status">Online • Ready to help</p>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message ${message.type}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-content">
                <div className="message-header">
                  <span className="sender-name">{message.type === "ai" ? "AI Tutor" : "You"}</span>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
                <div className="message-text">
                  {message.content.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="message ai typing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="message-content">
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">AI Tutor is typing...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-actions">
        <div className="quick-actions-header">
          <span>💡 Quick Actions</span>
        </div>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              className="quick-action-btn"
              onClick={() => handleQuickAction(action)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-text">{action.text}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about coding..."
            className="chat-input"
            disabled={isTyping}
          />
          <motion.button
            type="submit"
            className="send-button"
            disabled={!inputValue.trim() || isTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="send-icon">📤</span>
          </motion.button>
        </div>
      </form>
    </div>
  )
}

export default ChatTutor
