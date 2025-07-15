"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
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

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface QuickAction {
  text: string
  icon: string
}

interface FloatingAITutorProps {
  user: User
  lessonContext?: string
  onClose?: () => void
  isEmbedded?: boolean
}

const FloatingAITutor: React.FC<FloatingAITutorProps> = ({ 
  user, 
  lessonContext, 
  onClose, 
  isEmbedded = false 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMinimized, setIsMinimized] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: `Hi ${user.name}! 👋 I'm here to help you with your coding journey. I see you're currently learning about: ${lessonContext || "programming concepts"}. What questions do you have?`,
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

  const handleSendMessage = async (e: React.FormEvent) => {
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
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: generateAIResponse(inputValue, lessonContext),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string, lessonContext?: string): string => {
    const lowerInput = input.toLowerCase()

    // Context-aware responses for competitive programming
    if (lessonContext?.includes("solving")) {
      if (lowerInput.includes("two sum") || lowerInput.includes("array")) {
        return "Great question about Two Sum! 🎯\n\n**Approach:**\n1. **Brute Force**: Check all pairs - O(n²)\n2. **Hash Map**: Store complements - O(n)\n\n**Hash Map Solution:**\n```python\ndef two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n```\n\nWhich approach would you like me to explain further?"
      }

      if (lowerInput.includes("debug") || lowerInput.includes("error")) {
        return "I can help you debug your Two Sum solution! 🐛\n\nCommon issues:\n\n❌ **Using same element twice:**\n• Make sure you're not using nums[i] twice\n• Check indices, not just values\n\n❌ **Wrong return format:**\n• Return indices [i, j], not values [nums[i], nums[j]]\n\n❌ **Hash map key errors:**\n• Check if key exists before accessing\n• Use `in` operator or `.get()` method\n\n**Debugging checklist:**\n1. Print your hash map at each step\n2. Verify you're checking the complement correctly\n3. Test with the given examples first\n\nShare your code and I'll help you spot the issue!"
      }

      if (lowerInput.includes("optimize") || lowerInput.includes("improve")) {
        return "Great question about optimization! 🚀\n\n**Current best approach: Hash Map O(n)**\n\n**Why it's optimal:**\n• Single pass through array\n• Constant time lookups\n• Space-time tradeoff worth it\n\n**Edge cases to handle:**\n• Empty array\n• No solution exists (problem guarantees one)\n• Duplicate numbers\n• Negative numbers\n\n**Code optimization tips:**\n• Use enumerate() for cleaner code\n• Early return when solution found\n• Clear variable names (complement, seen)\n\n**Alternative for sorted arrays:**\n• Two pointers technique\n• But requires sorting first (O(n log n))\n\nYour hash map solution is already optimal for this problem!"
      }
    }

    // Context-aware responses for learning
    if (lessonContext?.includes("Variables")) {
      if (lowerInput.includes("variable") || lowerInput.includes("what")) {
        return "Great question about variables! 📝\n\nVariables are like labeled boxes that store data. In Python:\n• Use descriptive names (age, not x)\n• Start with letter or underscore\n• Case-sensitive (Age ≠ age)\n• No spaces (use snake_case)\n\nExample: user_name = 'Alice'\n\nWhat specific aspect would you like me to explain further?"
      }
    }

    // General coding help
    if (lowerInput.includes("debug") || lowerInput.includes("error")) {
      return "I'd love to help you debug! 🐛\n\nTo assist you better, please share:\n• Your code snippet\n• The error message\n• What you expected to happen\n\nCommon debugging steps:\n1. Read the error message carefully\n2. Check for typos and syntax\n3. Print variables to see their values\n4. Test with simple inputs first"
    }

    if (lowerInput.includes("explain") || lowerInput.includes("how")) {
      return "I'm here to explain any coding concept! 🧠\n\nI can help with:\n• Programming fundamentals\n• Algorithm explanations\n• Code examples and syntax\n• Best practices\n• Problem-solving strategies\n• Debugging techniques\n\nWhat specific topic would you like me to break down for you?"
    }

    if (lowerInput.includes("hint") || lowerInput.includes("stuck")) {
      return "No worries, let me give you a hint! 💡\n\nGeneral problem-solving approach:\n1. **Understand the problem** - What exactly are we looking for?\n2. **Think of examples** - Work through small cases manually\n3. **Consider data structures** - What would make lookups fast?\n4. **Start simple** - Get a working solution first\n5. **Optimize later** - Improve time/space complexity\n\nFor your current problem, think about:\n• What information do you need to store?\n• How can you avoid checking the same pairs twice?\n\nWant a more specific hint?"
    }

    // Default helpful response
    return "I'm here to help with your coding journey! 🚀\n\nI can assist with:\n• Explaining algorithms and concepts\n• Debugging code issues\n• Providing hints and guidance\n• Code optimization tips\n• Problem-solving strategies\n• Best practices\n\nWhat would you like to explore together?"
  }

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.text)
  }

  const quickActions: QuickAction[] =
    isEmbedded && lessonContext?.includes("solving")
      ? [
          { text: "Explain algorithm", icon: "🧠" },
          { text: "Debug my code", icon: "🐛" },
          { text: "Optimize solution", icon: "⚡" },
          { text: "Give me a hint", icon: "💡" },
        ]
      : [
          { text: "Explain this concept", icon: "🧠" },
          { text: "Help me debug", icon: "🐛" },
          { text: "Give me practice exercises", icon: "💪" },
          { text: "Show me examples", icon: "📝" },
        ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (onClose && isOpen) {
      onClose()
    }
  }

  // If embedded (like in sidebar), render the full chat interface
  if (isEmbedded) {
    return (
      <motion.div
        className={`floating-ai-tutor ${isMinimized ? "minimized" : ""}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="tutor-header">
          <div className="tutor-info">
            <div className="tutor-avatar">
              <span className="avatar-icon">🤖</span>
            </div>
            <div className="tutor-details">
              <h3>AI Tutor</h3>
              <p className="status">Ready to help</p>
            </div>
          </div>
          <div className="tutor-controls">
            <button className="minimize-btn" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? "📈" : "📉"}
            </button>
            {onClose && (
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              className="tutor-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="chat-messages">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`message ${message.type}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="message-content">
                        <div className="message-text">
                          {message.content.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                        <div className="message-time">{formatTime(message.timestamp)}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    className="message ai typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="message-content">
                      <div className="typing-indicator">
                        <div className="typing-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="typing-text">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="quick-actions">
                <div className="quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      className="quick-action-btn"
                      onClick={() => handleQuickAction(action)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                    placeholder="Ask me anything..."
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <>
      {/* Floating Button - only show when not open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="floating-ai-button"
            onClick={handleToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="ai-icon">🤖</span>
            <div className="pulse-ring"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Container - show in main content area when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="floating-chat-container main-area"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="chat-header">
                <div className="ai-avatar">🤖</div>
                <div className="ai-info">
                  <h4>AI Tutor</h4>
                  <span className="status">Online</span>
                </div>
                <button className="close-btn" onClick={handleToggle}>
                  ✕
                </button>
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
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="message-content">
                      <div className="typing-indicator">
                        <div className="typing-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="typing-text">Thinking...</span>
                      </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingAITutor
