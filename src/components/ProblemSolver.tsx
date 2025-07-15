"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useTheme } from "../contexts/ThemeContext.tsx"
import "./ProblemSolver.css"

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

interface ProblemSolverProps {
  user: User
}

interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  description: string
  inputFormat: string
  outputFormat: string
  sampleInput: string
  sampleOutput: string
  constraints: string[]
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ user }) => {
  const { problemId } = useParams<{ problemId: string }>()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [customInput, setCustomInput] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  // Add state for active tab and submissions/discussions data
  const [activeTab, setActiveTab] = useState<"problem" | "submissions" | "discussions">("problem")

  // Add sample data for submissions and discussions
  const submissions = [
    {
      id: 1,
      status: "Accepted",
      language: "Python",
      runtime: "45ms",
      memory: "14.2MB",
      timestamp: "2024-01-15 10:30:00",
    },
    {
      id: 2,
      status: "Wrong Answer",
      language: "Python",
      runtime: "52ms",
      memory: "14.1MB",
      timestamp: "2024-01-15 10:25:00",
    },
    {
      id: 3,
      status: "Time Limit Exceeded",
      language: "Java",
      runtime: "2000ms",
      memory: "16.5MB",
      timestamp: "2024-01-15 10:20:00",
    },
  ]

  const discussions = [
    {
      id: 1,
      title: "Optimal O(n) solution using HashMap",
      author: "CodeMaster",
      replies: 23,
      likes: 156,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Why is my solution getting TLE?",
      author: "NewbieCoder",
      replies: 8,
      likes: 12,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Alternative approach using two pointers",
      author: "AlgoExpert",
      replies: 15,
      likes: 89,
      timestamp: "1 day ago",
    },
  ]

  // Sample problem data
  const problem: Problem = {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    inputFormat: "You do not need to read any input in this challenge.",
    outputFormat: `Print Hello, World! to stdout.`,
    sampleInput: "No input required",
    sampleOutput: "Hello, World!",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
  }

  const languages = [
    { value: "python", label: "Python 3", extension: "py" },
    { value: "javascript", label: "JavaScript", extension: "js" },
    { value: "java", label: "Java", extension: "java" },
    { value: "cpp", label: "C++", extension: "cpp" },
  ]

  const defaultCode = {
    python: `if __name__ == '__main__':
    print("Hello, World!")`,
    javascript: `console.log("Hello, World!");`,
    java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  }

  useEffect(() => {
    setCode(defaultCode[selectedLanguage as keyof typeof defaultCode] || "")
  }, [selectedLanguage])

  const handleRunCode = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      setOutput("Hello, World!")
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmitCode = async () => {
    setIsRunning(true)
    // Simulate code submission
    setTimeout(() => {
      setOutput("✅ All test cases passed!\nExecution time: 45ms\nMemory usage: 14.2MB")
      setIsRunning(false)
    }, 3000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#10b981"
      case "Medium":
        return "#f59e0b"
      case "Hard":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="problem-solver">
      <div className="problem-header">
        <div className="header-left">
          <Link to="/competitive" className="back-btn">
            ← Back to Problems
          </Link>
          <div className="problem-title">
            <h1>{problem.title}</h1>
            <div className="problem-meta">
              <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(problem.difficulty) }}>
                {problem.difficulty}
              </span>
              <span className="category-badge">{problem.category}</span>
            </div>
          </div>
        </div>

        <div className="header-controls">
          <button className="theme-toggle-btn" onClick={toggleDarkMode}>
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="language-select"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="problem-content">
        <div className="problem-description">
          {/* Update the description tabs section */}
          <div className="description-tabs">
            <button
              className={`tab ${activeTab === "problem" ? "active" : ""}`}
              onClick={() => setActiveTab("problem")}
            >
              Problem
            </button>
            <button
              className={`tab ${activeTab === "submissions" ? "active" : ""}`}
              onClick={() => setActiveTab("submissions")}
            >
              Submissions
            </button>
            <button
              className={`tab ${activeTab === "discussions" ? "active" : ""}`}
              onClick={() => setActiveTab("discussions")}
            >
              Discussions
            </button>
          </div>

          <div className="description-content">
            {activeTab === "problem" && (
              <>
                <section className="description-section">
                  <h3>Problem Statement</h3>
                  <p>{problem.description}</p>
                </section>

                <section className="description-section">
                  <h3>Examples</h3>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="example">
                      <h4>Example {index + 1}:</h4>
                      <div className="example-content">
                        <div className="example-item">
                          <strong>Input:</strong> {example.input}
                        </div>
                        <div className="example-item">
                          <strong>Output:</strong> {example.output}
                        </div>
                        {example.explanation && (
                          <div className="example-item">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </section>

                <section className="description-section">
                  <h3>Constraints</h3>
                  <ul>
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === "submissions" && (
              <section className="submissions-section">
                <h3>My Submissions</h3>
                <div className="submissions-list">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="submission-item">
                      <div className="submission-status">
                        <span className={`status-badge ${submission.status.toLowerCase().replace(" ", "-")}`}>
                          {submission.status}
                        </span>
                      </div>
                      <div className="submission-details">
                        <div className="submission-meta">
                          <span className="language">{submission.language}</span>
                          <span className="runtime">{submission.runtime}</span>
                          <span className="memory">{submission.memory}</span>
                        </div>
                        <div className="submission-time">{submission.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "discussions" && (
              <section className="discussions-section">
                <h3>Discussions</h3>
                <div className="discussions-list">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="discussion-item">
                      <div className="discussion-content">
                        <h4 className="discussion-title">{discussion.title}</h4>
                        <div className="discussion-meta">
                          <span className="author">by {discussion.author}</span>
                          <span className="timestamp">{discussion.timestamp}</span>
                        </div>
                      </div>
                      <div className="discussion-stats">
                        <span className="replies">💬 {discussion.replies}</span>
                        <span className="likes">👍 {discussion.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="code-editor-section">
          <div className="editor-header">
            <div className="editor-tabs">
              <button className="editor-tab active">
                Code ({languages.find((l) => l.value === selectedLanguage)?.extension})
              </button>
            </div>
            <div className="editor-actions">
              <button className="action-btn" onClick={() => setShowCustomInput(!showCustomInput)}>
                📝 Custom Input
              </button>
            </div>
          </div>

          <div className="code-editor">
            <div className="line-numbers">
              {code.split("\n").map((_, index) => (
                <div key={index} className="line-number">
                  {index + 1}
                </div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="code-textarea"
              spellCheck={false}
              placeholder="Write your code here..."
            />
          </div>

          {showCustomInput && (
            <motion.div
              className="custom-input-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h4>Custom Input</h4>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="custom-input-textarea"
                placeholder="Enter your custom input here..."
              />
            </motion.div>
          )}

          <div className="output-section">
            <div className="output-header">
              <h4>Output</h4>
              {isRunning && <div className="loading-spinner">⏳ Running...</div>}
            </div>
            <div className="output-content">
              {output ? (
                <pre className="output-text">{output}</pre>
              ) : (
                <div className="output-placeholder">Click "Run Code" to see the output here</div>
              )}
            </div>
          </div>

          <div className="editor-footer">
            {/* Remove the upload button from footer-left */}
            <div className="footer-left">
              <button className="test-btn" onClick={() => setShowCustomInput(!showCustomInput)}>
                🧪 Test against custom input
              </button>
            </div>
            <div className="footer-right">
              <motion.button
                className="run-btn"
                onClick={handleRunCode}
                disabled={isRunning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? "Running..." : "Run Code"}
              </motion.button>
              <motion.button
                className="submit-btn"
                onClick={handleSubmitCode}
                disabled={isRunning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? "Submitting..." : "Submit Code"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemSolver
