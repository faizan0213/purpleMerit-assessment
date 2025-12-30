import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import '../styles/ProfilePage.css'

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateEditForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    return newErrors
  }

  const validatePasswordForm = () => {
    const newErrors = {}
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required'
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required'
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSaveProfile = async () => {
    const newErrors = validateEditForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const response = await axiosInstance.put('/users/profile', formData)
      updateUser(response.data.user)
      toast.success('Profile updated successfully!')
      setEditMode(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    const newErrors = validatePasswordForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await axiosInstance.put('/users/change-password', {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      toast.success('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setChangePasswordMode(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({ fullName: user?.fullName || '', email: user?.email || '' })
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setErrors({})
    setEditMode(false)
    setChangePasswordMode(false)
  }

  if (!user) return <div>Loading...</div>

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h1>My Profile</h1>

          {!editMode && !changePasswordMode && (
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{user.fullName}</p>
              </div>
              <div className="info-group">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-group">
                <label>Role</label>
                <p>{user.role}</p>
              </div>
              <div className="info-group">
                <label>Account Status</label>
                <p>{user.status}</p>
              </div>
              <div className="button-group">
                <button className="btn-primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
                <button className="btn-secondary" onClick={() => setChangePasswordMode(true)}>
                  Change Password
                </button>
              </div>
            </div>
          )}

          {editMode && (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleEditChange}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEditChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="button-group">
                <button className="btn-primary" onClick={handleSaveProfile} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {changePasswordMode && (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your current password"
                />
                {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="button-group">
                <button className="btn-primary" onClick={handleChangePassword} disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
                <button className="btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage
