import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLogOut, FiHome } from 'react-icons/fi'
import '../styles/Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={user?.role === 'admin' ? '/dashboard' : '/profile'} className="navbar-brand">
          <FiHome className="nav-icon" />
          User Management System
        </Link>

        <div className="navbar-menu">
          {user && (
            <>
              <div className="user-info">
                <span className="user-name">{user.fullName}</span>
                <span className="user-role">{user.role}</span>
              </div>
              
              <button onClick={handleLogout} className="btn-logout">
                <FiLogOut /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
