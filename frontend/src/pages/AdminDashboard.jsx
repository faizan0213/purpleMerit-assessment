import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FiCheck, FiX } from 'react-icons/fi'
import axiosInstance from '../api/axiosConfig'
import Navbar from '../components/Navbar'
import ConfirmModal from '../components/ConfirmModal'
import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [confirmModal, setConfirmModal] = useState({ show: false, action: null, userId: null, message: '' })

  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/users?page=${currentPage}&limit=${ITEMS_PER_PAGE}`)
      setUsers(response.data.users)
      setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE))
    } catch (error) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleActivateClick = (userId) => {
    setConfirmModal({
      show: true,
      action: 'activate',
      userId,
      message: 'Are you sure you want to activate this user?'
    })
  }

  const handleDeactivateClick = (userId) => {
    setConfirmModal({
      show: true,
      action: 'deactivate',
      userId,
      message: 'Are you sure you want to deactivate this user?'
    })
  }

  const handleConfirmAction = async () => {
    const { action, userId } = confirmModal
    setLoading(true)
    try {
      await axiosInstance.patch(`/users/${userId}/status`, {
        status: action === 'activate' ? 'active' : 'inactive'
      })
      toast.success(`User ${action}d successfully!`)
      setConfirmModal({ show: false, action: null, userId: null, message: '' })
      fetchUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user status')
    } finally {
      setLoading(false)
    }
  }

  if (loading && users.length === 0) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <div className="loader"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1>Admin Dashboard - User Management</h1>
          <p className="subtitle">Manage all users in the system</p>

          {users.length === 0 ? (
            <p className="no-users">No users found</p>
          ) : (
            <>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{user.fullName}</td>
                        <td>
                          <span className={`role-badge role-${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge status-${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="actions">
                          {user.status === 'inactive' ? (
                            <button
                              className="btn-action btn-activate"
                              onClick={() => handleActivateClick(user._id)}
                              title="Activate user"
                            >
                              <FiCheck /> Activate
                            </button>
                          ) : (
                            <button
                              className="btn-action btn-deactivate"
                              onClick={() => handleDeactivateClick(user._id)}
                              title="Deactivate user"
                            >
                              <FiX /> Deactivate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn-pagination"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn-pagination"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {confirmModal.show && (
        <ConfirmModal
          message={confirmModal.message}
          onConfirm={handleConfirmAction}
          onCancel={() => setConfirmModal({ show: false, action: null, userId: null, message: '' })}
          loading={loading}
        />
      )}
    </>
  )
}

export default AdminDashboard
