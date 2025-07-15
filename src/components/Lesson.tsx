"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import "./Lesson.css"

interface LessonProps {
  user?: any
}

interface LessonContent {
  id: number
  title: string
  content: string
  codeExample: string
  expectedOutput: string
  explanation: string
  hints: string[]
}

const Lesson: React.FC<LessonProps> = ({ user }) => {
  const { language, lessonId } = useParams<{ language: string; lessonId: string }>()
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const codeEditorRef = useRef<HTMLTextAreaElement>(null)

  // Sample lesson content - in real app this would come from API
  const lessonContent: LessonContent = {
    id: 1,
    title: "Comments in Python",
    content: `Since Python will ignore string literals that are not assigned to a variable, you can add a multiline string (triple quotes) in your code, and place your comment inside it:`,
    codeExample: `"""
This is a comment
written in
more than just one line
"""
print("Hello, World!")`,
    expectedOutput: "Hello, World!",
    explanation: `As long as the string is not assigned to a variable, Python will read the code, but then ignore it, and you have made a multiline comment.`,
    hints: [
      'Triple quotes (""") can be used for multiline strings',
      "Unassigned strings are ignored by Python",
      "This is a common way to create multiline comments",
    ],
  }

  useState(() => {
    setCode(lessonContent.codeExample)
  })

  const runCode = async () => {
    setIsRunning(true)
    setOutput("")

    try {
      // Simulate Python execution - in real app you'd use Pyodide or similar
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple Python interpreter simulation
      const lines = code.split("\n")
      let result = ""

      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.startsWith("print(")) {
          const match = trimmed.match(/print$$["'](.*)["']$$/)
          if (match) {
            result += match[1] + "\n"
          }
        }
      }

      setOutput(result || "No output")
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(lessonContent.codeExample)
    setOutput("")
  }

  const nextLesson = () => {
    // Navigate to next lesson
    console.log("Navigate to next lesson")
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <motion.div
          className="lesson-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to={`/learning/${language}`} className="back-btn">
            ← Back to Path
          </Link>
          <div className="lesson-progress">
            <span>Lesson 3 of 6</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "50%" }}></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lesson-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1>{lessonContent.title}</h1>
          <div className="lesson-meta">
            <span className="difficulty">Beginner</span>
            <span className="duration">15 min</span>
            <span className="xp">+100 XP</span>
          </div>
        </motion.div>
      </div>

      <div className="lesson-content">
        <div className="lesson-main">
          <motion.section
            className="lesson-explanation"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="content-text">
              <p>{lessonContent.content}</p>
            </div>

            <div className="example-section">
              <h3>Example</h3>
              <div className="code-example">
                <div className="code-display">
                  <pre>
                    <code>
                      {`"""
This is a comment
written in
more than just one line
"""
print("Hello, World!")`}
                    </code>
                  </pre>
                </div>
                <button
                  className="try-button"
                  onClick={() => {
                    const editor = document.querySelector(".code-editor") as HTMLElement
                    if (editor) {
                      editor.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Try it Yourself »
                </button>
              </div>
            </div>

            <div className="explanation-text">
              <p>{lessonContent.explanation}</p>
            </div>
          </motion.section>

          <motion.section
            className="code-editor-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="editor-header">
              <h3>Interactive Code Editor</h3>
              <div className="editor-controls">
                <button onClick={resetCode} className="reset-btn">
                  Reset
                </button>
                <button onClick={runCode} className="run-btn" disabled={isRunning}>
                  {isRunning ? "Running..." : "Run Code"}
                </button>
              </div>
            </div>

            <div className="code-editor">
              <div className="editor-container">
                <textarea
                  ref={codeEditorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="code-textarea"
                  placeholder="Write your Python code here..."
                  spellCheck={false}
                />
                <div className="line-numbers">
                  {code.split("\n").map((_, index) => (
                    <div key={index} className="line-number">
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="output-section">
                <div className="output-header">
                  <h4>Output</h4>
                  {output && <span className="output-status success">✓ Code executed successfully</span>}
                </div>
                <div className="output-content">
                  {output ? (
                    <pre>{output}</pre>
                  ) : (
                    <div className="output-placeholder">Click "Run Code" to see the output here</div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <div className="lesson-sidebar">
          <motion.div
            className="hints-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-header">
              <h3>💡 Hints</h3>
              <button onClick={() => setShowHints(!showHints)} className="toggle-btn">
                {showHints ? "Hide" : "Show"}
              </button>
            </div>
            {showHints && (
              <ul className="hints-list">
                {lessonContent.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            className="progress-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3>Your Progress</h3>
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-value">3/6</span>
                <span className="stat-label">Lessons</span>
              </div>
              <div className="stat">
                <span className="stat-value">275</span>
                <span className="stat-label">XP</span>
              </div>
            </div>
            <div className="next-lesson">
              <p>Next: Object-Oriented Programming</p>
              <button onClick={nextLesson} className="next-btn">
                Continue →
              </button>
            </div>
          </motion.div>

          <motion.div
            className="ai-tutor-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3>🤖 Need Help?</h3>
            <p>Stuck on this lesson? Ask our AI tutor for personalized help!</p>
            <Link to="/chat" className="ai-tutor-btn">
              Ask AI Tutor
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Lesson
