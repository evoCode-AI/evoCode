"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
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
  bio?: string
  location?: string
  github?: string
  linkedin?: string
  website?: string
  joinDate?: string
  profilePicture?: string
}

interface ProfileProps {
  user: User
}

const Profile: React.FC<ProfileProps> = ({ user: initialUser }) => {
  const [user, setUser] = useState<User>({
    ...initialUser,
    bio: initialUser.bio || "Passionate about coding and continuous learning!",
    location: initialUser.location || "San Francisco, CA",
    github: initialUser.github || "",
    linkedin: initialUser.linkedin || "",
    website: initialUser.website || "",
    joinDate: initialUser.joinDate || "January 2024",
    profilePicture: initialUser.profilePicture || "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(user)
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "activity" | "settings">("overview")

  const handleSave = () => {
    setUser(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(user)
    setIsEditing(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditForm({ ...editForm, profilePicture: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const achievements = [
    { name: "First Steps", icon: "👶", description: "Completed your first lesson", earned: true, date: "Jan 15, 2024" },
    { name: "Code Warrior", icon: "⚔️", description: "Solved 10 coding problems", earned: true, date: "Jan 20, 2024" },
    { name: "Streak Master", icon: "🔥", description: "Maintained a 7-day streak", earned: true, date: "Jan 25, 2024" },
    { name: "Bug Hunter", icon: "🐛", description: "Debug 5 different programs", earned: false, date: null },
    {
      name: "Speed Demon",
      icon: "⚡",
      description: "Complete a lesson in under 10 minutes",
      earned: false,
      date: null,
    },
    { name: "Master Coder", icon: "👑", description: "Reach level 10", earned: false, date: null },
  ]

  const recentActivity = [
    { action: "Completed Python Basics - Variables", time: "2 hours ago", xp: 50 },
    { action: "Solved Array Manipulation Problem", time: "5 hours ago", xp: 25 },
    { action: "Earned 'Streak Master' achievement", time: "1 day ago", xp: 100 },
    { action: "Started JavaScript Fundamentals", time: "2 days ago", xp: 0 },
    { action: "Completed Data Structures Quiz", time: "3 days ago", xp: 75 },
  ]

  const stats = [
    { label: "Problems Solved", value: "47", icon: "✅" },
    { label: "Hours Coded", value: "128", icon: "⏱️" },
    { label: "Languages", value: "4", icon: "💻" },
    { label: "Certificates", value: "2", icon: "🏆" },
  ]

  return (
    <div className="profile">
      <div className="profile-header">
        <motion.div
          className="profile-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="banner-gradient"></div>
          <div className="profile-main">
            <div className="profile-picture-container">
              {isEditing ? (
                <div className="picture-upload">
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <label htmlFor="profile-picture" className="upload-label">
                    {editForm.profilePicture ? (
                      <img
                        src={editForm.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="profile-picture"
                      />
                    ) : (
                      <div className="default-avatar">
                        <span>{editForm.name.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <div className="upload-overlay">
                      <span>📷</span>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="profile-picture">
                  {user.profilePicture ? (
                    <img src={user.profilePicture || "/placeholder.svg"} alt="Profile" />
                  ) : (
                    <div className="default-avatar">
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="level-badge">
                <span>Level {user.level}</span>
              </div>
            </div>

            <div className="profile-info">
              {isEditing ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="edit-input name-input"
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="edit-input"
                    placeholder="Your email"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="edit-textarea"
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="edit-input"
                    placeholder="Your location"
                  />
                </div>
              ) : (
                <div className="profile-details">
                  <h1>{user.name}</h1>
                  <p className="email">{user.email}</p>
                  <p className="bio">{user.bio}</p>
                  <div className="profile-meta">
                    <span className="location">📍 {user.location}</span>
                    <span className="join-date">📅 Joined {user.joinDate}</span>
                  </div>
                </div>
              )}

              <div className="profile-actions">
                {isEditing ? (
                  <div className="edit-actions">
                    <button onClick={handleSave} className="save-btn">
                      Save Changes
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="edit-btn">
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="profile-stats">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`tab ${activeTab === "achievements" ? "active" : ""}`}
            onClick={() => setActiveTab("achievements")}
          >
            🏆 Achievements
          </button>
          <button
            className={`tab ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            📈 Activity
          </button>
          <button
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "overview" && (
            <motion.div
              className="overview-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="overview-grid">
                <div className="progress-card">
                  <h3>🎯 Learning Progress</h3>
                  <div className="progress-item">
                    <span>Python</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "75%" }}></div>
                    </div>
                    <span>75%</span>
                  </div>
                  <div className="progress-item">
                    <span>JavaScript</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "45%" }}></div>
                    </div>
                    <span>45%</span>
                  </div>
                  <div className="progress-item">
                    <span>Java</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "30%" }}></div>
                    </div>
                    <span>30%</span>
                  </div>
                </div>

                <div className="social-links-card">
                  <h3>🔗 Social Links</h3>
                  {isEditing ? (
                    <div className="social-edit">
                      <input
                        type="text"
                        value={editForm.github}
                        onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                        placeholder="GitHub username"
                        className="social-input"
                      />
                      <input
                        type="text"
                        value={editForm.linkedin}
                        onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                        placeholder="LinkedIn profile"
                        className="social-input"
                      />
                      <input
                        type="text"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        placeholder="Personal website"
                        className="social-input"
                      />
                    </div>
                  ) : (
                    <div className="social-links">
                      {user.github && (
                        <a
                          href={`https://github.com/${user.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          <span className="social-icon">🐙</span>
                          <span>GitHub</span>
                        </a>
                      )}
                      {user.linkedin && (
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                          <span className="social-icon">💼</span>
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {user.website && (
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="social-link">
                          <span className="social-icon">🌐</span>
                          <span>Website</span>
                        </a>
                      )}
                      {!user.github && !user.linkedin && !user.website && (
                        <p className="no-links">No social links added yet</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              className="achievements-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    className={`achievement-card ${achievement.earned ? "earned" : "locked"}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-info">
                      <h4>{achievement.name}</h4>
                      <p>{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <span className="achievement-date">Earned on {achievement.date}</span>
                      )}
                    </div>
                    {achievement.earned && <div className="earned-badge">✓</div>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              className="activity-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="activity-list">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="activity-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                    {activity.xp > 0 && <div className="activity-xp">+{activity.xp} XP</div>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              className="settings-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="settings-sections">
                <div className="settings-section">
                  <h3>🔔 Notifications</h3>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications for new lessons</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Daily streak reminders</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      <span>Weekly progress reports</span>
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>🎨 Preferences</h3>
                  <div className="setting-item">
                    <label>
                      <span>Preferred coding language</span>
                      <select className="setting-select">
                        <option>Python</option>
                        <option>JavaScript</option>
                        <option>Java</option>
                        <option>C++</option>
                      </select>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <span>Difficulty level</span>
                      <select className="setting-select">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>🔒 Privacy</h3>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Make profile public</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      <span>Show progress on leaderboard</span>
                    </label>
                  </div>
                </div>

                <div className="settings-section danger">
                  <h3>⚠️ Danger Zone</h3>
                  <button className="danger-btn">Delete Account</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
