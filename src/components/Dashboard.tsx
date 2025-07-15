"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts"
import "./Dashboard.css"

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

interface DashboardProps {
  user: User
}

interface Language {
  name: string
  icon: string
  progress: number
  lessons: number
  completed: number
  color: string
}

interface ProgressData {
  day: string
  xp: number
}

interface Achievement {
  name: string
  icon: string
  earned: boolean
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const languages: Language[] = [
    {
      name: "Python",
      icon: "🐍",
      progress: 65,
      lessons: 24,
      completed: 15,
      color: "#3776ab",
    },
    {
      name: "JavaScript",
      icon: "⚡",
      progress: 40,
      lessons: 30,
      completed: 12,
      color: "#f7df1e",
    },
    {
      name: "Java",
      icon: "☕",
      progress: 25,
      lessons: 28,
      completed: 7,
      color: "#ed8b00",
    },
    {
      name: "C++",
      icon: "⚙️",
      progress: 10,
      lessons: 32,
      completed: 3,
      color: "#00599c",
    },
  ]

  const progressData: ProgressData[] = [
    { day: "Mon", xp: 120 },
    { day: "Tue", xp: 180 },
    { day: "Wed", xp: 150 },
    { day: "Thu", xp: 220 },
    { day: "Fri", xp: 190 },
    { day: "Sat", xp: 280 },
    { day: "Sun", xp: 240 },
  ]

  const achievements: Achievement[] = [
    { name: "First Steps", icon: "👶", earned: true },
    { name: "Code Warrior", icon: "⚔️", earned: true },
    { name: "Bug Hunter", icon: "🐛", earned: false },
    { name: "Speed Demon", icon: "⚡", earned: false },
    { name: "Master Coder", icon: "👑", earned: false },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <motion.div
          className="welcome-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome back, {user.name}! 🚀</h1>
          <p>Let's continue your coding journey</p>
        </motion.div>

        <motion.div
          className="stats-overview"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>{user.streak || 7}</h3>
              <p>Day Streak</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{user.xp || 1250}</h3>
              <p>Total XP</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <h3>{user.level || 5}</h3>
              <p>Level</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <motion.section
            className="languages-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>Choose Your Language</h2>
            <div className="languages-grid">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  className="language-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Link to={`/learning/${lang.name.toLowerCase()}`}>
                    <div className="language-icon">{lang.icon}</div>
                    <h3>{lang.name}</h3>
                    <div className="progress-info">
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          style={{ backgroundColor: lang.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                        />
                      </div>
                      <span>
                        {lang.completed}/{lang.lessons} lessons
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="progress-chart-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2>Weekly Progress</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="xp"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#6366f1", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.section>
        </div>

        <div className="sidebar-content">
          <motion.section
            className="achievements-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2>Achievements</h2>
            <div className="achievements-list">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  className={`achievement-item ${achievement.earned ? "earned" : "locked"}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <span>{achievement.name}</span>
                  {achievement.earned && <div className="earned-badge">✓</div>}
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="daily-goal-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2>Daily Goal</h2>
            <div className="goal-progress">
              <div className="goal-circle">
                <ResponsiveContainer width={120} height={120}>
                  <RadialBarChart cx={60} cy={60} innerRadius={40} outerRadius={55} data={[{ value: 75 }]}>
                    <RadialBar dataKey="value" fill="#6366f1" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="goal-text">
                  <span className="goal-percentage">75%</span>
                  <span className="goal-label">Complete</span>
                </div>
              </div>
              <p>3 out of 4 lessons completed today!</p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
