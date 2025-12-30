import React from 'react'
import '../styles/Modal.css'

const ConfirmModal = ({ message, onConfirm, onCancel, loading }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Confirm Action</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button
            className="btn-primary"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </button>
          <button
            className="btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
