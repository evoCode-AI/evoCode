"use client"
import { motion } from "framer-motion"
import type React from "react"

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import "./Profile.css"

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

interface ProfileProps {
  user: User
}

interface SkillData {
  skill: string
  level: number
  color: string
}

interface WeeklyActivity {
  day: string
  hours: number
}

interface Achievement {
  name: string
  description: string
  earned: boolean
  date?: string
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const skillsData: SkillData[] = [
    { skill: "Python", level: 65, color: "#3776ab" },
    { skill: "JavaScript", level: 40, color: "#f7df1e" },
    { skill: "Java", level: 25, color: "#ed8b00" },
    { skill: "C++", level: 10, color: "#00599c" },
  ]

  const weeklyActivity: WeeklyActivity[] = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 4.0 },
    { day: "Sun", hours: 2.8 },
  ]

  const achievements: Achievement[] = [
    { name: "First Steps", description: "Complete your first lesson", earned: true, date: "2024-01-15" },
    { name: "Code Warrior", description: "Solve 10 coding problems", earned: true, date: "2024-01-20" },
    { name: "Streak Master", description: "Maintain a 7-day streak", earned: true, date: "2024-01-25" },
    { name: "Bug Hunter", description: "Debug 5 programs successfully", earned: false },
    { name: "Speed Demon", description: "Complete a lesson in under 10 minutes", earned: false },
    { name: "Master Coder", description: "Complete all beginner courses", earned: false },
  ]

  return (
    <div className="profile">
      <div className="profile-header">
        <motion.div
          className="profile-info"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="profile-avatar-large">{user.name.charAt(0).toUpperCase()}</div>
          <div className="profile-details">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <div className="profile-level">
              <span className="level-badge">Level {user.level || 5}</span>
              <span className="xp-info">{user.xp || 1250} XP</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="profile-stats"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat-card">
            <h3>🔥 {user.streak || 7}</h3>
            <p>Day Streak</p>
          </div>
          <div className="stat-card">
            <h3>📚 23</h3>
            <p>Lessons Completed</p>
          </div>
          <div className="stat-card">
            <h3>🏆 3</h3>
            <p>Achievements</p>
          </div>
          <div className="stat-card">
            <h3>⏱️ 18h</h3>
            <p>Time Spent</p>
          </div>
        </motion.div>
      </div>

      <div className="profile-content">
        <div className="main-content">
          <motion.section
            className="skills-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>Programming Skills</h2>
            <div className="skills-grid">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  className="skill-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="skill-info">
                    <h3>{skill.skill}</h3>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-progress">
                    <motion.div
                      className="skill-bar"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="activity-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2>Weekly Activity</h2>
            <div className="activity-chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivity}>
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
                  <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
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
                  className={`achievement-card ${achievement.earned ? "earned" : "locked"}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="achievement-content">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    {achievement.earned && achievement.date && (
                      <span className="earned-date">Earned: {achievement.date}</span>
                    )}
                  </div>
                  {achievement.earned && <div className="earned-badge">✓</div>}
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="progress-overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2>Overall Progress</h2>
            <div className="progress-circle">
              <ResponsiveContainer width={150} height={150}>
                <RadialBarChart cx={75} cy={75} innerRadius={50} outerRadius={70} data={[{ value: 68 }]}>
                  <RadialBar dataKey="value" fill="#6366f1" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="progress-text">
                <span className="progress-percentage">68%</span>
                <span className="progress-label">Complete</span>
              </div>
            </div>
            <p>You're making great progress! Keep up the excellent work.</p>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default Profile
