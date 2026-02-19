import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import './Auth.css'

function LoginPage({open, setOpenDialog, onAuthSuccess}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await authService.login(email, password)
            if (response.success) {
                onAuthSuccess()
                navigate('/')
            } else {
                setError(response.message || 'Login failed')
            }
        } catch {
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
  return (
    <dialog open={open} className="auth-dialog">
      <div className="auth-card">
        <button
          type="button"
          className="auth-close-btn"
          onClick={() => setOpenDialog('')}
        >
          ×
        </button>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Log in to continue learning</p>
        <form className="auth-form" onSubmit={handleSubmit}>  
          {error && <div style={{ color: 'red', marginBottom: '12px' }}>{error}</div>}
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>  
          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => { setOpenDialog('signup') }}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </dialog>
  )
}

export default LoginPage