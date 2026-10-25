import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from 'lucide-react'
import './Auth.css'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please complete all fields.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length < 8) {
      setError('Your password must contain at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    if (localStorage.getItem('nexcera-user')) {
      try {
        const existingUser = JSON.parse(
          localStorage.getItem('nexcera-user')!,
        ) as { email: string }

        if (existingUser.email.toLowerCase() === email.trim().toLowerCase()) {
          setError('An account with this email already exists. Please sign in.')
          return
        }
      } catch {
        // Replace an unreadable prototype account with the new account.
      }
    }

    // Prototype only: never store plain-text passwords in a production app.
    localStorage.setItem(
      'nexcera-user',
      JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
      }),
    )

    localStorage.setItem(
      'nexcera-session',
      JSON.stringify({ name: name.trim(), email: email.trim() }),
    )

    navigate('/dashboard', { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link to="/signup" className="auth-brand">
          <span className="auth-brand-mark">
            <Sparkles size={21} />
          </span>
          <span>NEXCERA<span className="brand-period">.</span></span>
        </Link>

        <div className="auth-hero">
          <span className="auth-eyebrow">
            <span className="auth-live-dot" />
            A CLEARER VIEW OF THE MARKETS
          </span>

          <h1>
            Make your next
            <br />
            move <span>informed.</span>
          </h1>

          <p>
            Bring your market watchlist, portfolio overview,
            and future financial insights into one thoughtfully
            designed workspace.
          </p>

          <div className="auth-preview-card">
            <div className="preview-card-top">
              <div>
                <span className="preview-label">YOUR NEXT CHAPTER</span>
                <h3>Start with perspective.</h3>
              </div>
              <span className="preview-icon"><Sparkles size={17} /></span>
            </div>

            <div className="preview-chart" aria-hidden="true">
              <div className="preview-grid-line" />
              <div className="preview-grid-line" />
              <svg viewBox="0 0 420 105" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="signup-preview-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#36d399" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#36d399" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 83 L35 71 L65 76 L100 48 L130 58 L170 35 L205 49 L245 24 L280 38 L320 17 L350 29 L385 9 L420 15 L420 105 L0 105 Z"
                  fill="url(#signup-preview-fill)"
                />
                <path
                  d="M0 83 L35 71 L65 76 L100 48 L130 58 L170 35 L205 49 L245 24 L280 38 L320 17 L350 29 L385 9 L420 15"
                  fill="none"
                  stroke="#36d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="preview-card-bottom">
              <span><span className="auth-live-dot" /> A workspace built for you</span>
              <span>DEMO</span>
            </div>
          </div>
        </div>

        <p className="auth-brand-footer">
          © 2026 Nexcera · Built for informed decisions
        </p>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">
            <span className="auth-brand-mark"><Sparkles size={20} /></span>
            <strong>NEXCERA<span className="brand-period">.</span></strong>
          </div>

          <div className="auth-heading">
            <span className="auth-step-label">GET STARTED</span>
            <h2>Create account<span>.</span></h2>
            <p>Set up your workspace in just a few steps.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="signup-name">Full name</label>
            <div className="auth-input-wrap">
              <UserRound size={17} aria-hidden="true" />
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <label htmlFor="signup-email">Email address</label>
            <div className="auth-input-wrap">
              <Mail size={17} aria-hidden="true" />
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label htmlFor="signup-password">Password</label>
            <div className="auth-input-wrap">
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="auth-password-toggle"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <label htmlFor="signup-confirm-password">Confirm password</label>
            <div className="auth-input-wrap">
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <button
                className="auth-password-toggle"
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button className="auth-submit" type="submit">
              Create account <ArrowRight size={17} />
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <div className="auth-security-note">
            <LockKeyhole size={14} />
            <span>Prototype mode · Do not use a real or reused password.</span>
          </div>
        </div>
      </section>
    </main>
  )
}
