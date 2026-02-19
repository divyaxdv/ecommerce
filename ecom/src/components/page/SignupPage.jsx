import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import './Auth.css'

function SignupPage({open, setOpenDialog, onAuthSuccess}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            const response = await authService.signup(fullName, email, password)
            if (response.success) {
                onAuthSuccess()
                navigate('/')
            } else {
                setError(response.message || 'Signup failed')
            }
        } catch {
            setError('Signup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'fullName':
                setFullName(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'confirmPassword':
                setConfirmPassword(e.target.value)
                break
            default:
                break
        }
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
        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Join LearnHub in a few seconds</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div style={{ color: 'red', marginBottom: '12px' }}>{error}</div>}
          <label className="auth-field">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              placeholder="Alex Johnson"
              value={fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={handleChange}
              required
            />
          </label>
          <label className="auth-field">
            <span>Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
          <p className="auth-switch">
            Already have an account?{" "}
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => { setOpenDialog('login') }}
            >
              Log in
            </button>
          </p>
        </form>    
      </div>
    </dialog>
  )
}

export default SignupPage