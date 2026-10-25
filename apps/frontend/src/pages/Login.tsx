import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from 'lucide-react'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    const savedUser = localStorage.getItem('nexcera-user')

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as {
          email: string
          password: string
          name: string
        }

        if (
          user.email.toLowerCase() !== email.trim().toLowerCase() ||
          user.password !== password
        ) {
          setError('Invalid email or password.')
          return
        }

        localStorage.setItem(
          'nexcera-session',
          JSON.stringify({ email: user.email, name: user.name }),
        )
      } catch {
        setError('Unable to read your saved account. Please sign up again.')
        return
      }
    }
   else {
    setError('No account found. Please create an account first.')
    return
  }

  navigate('/dashboard', { replace: true })
}

return (
  <main className="auth-page">
    <section className="auth-brand-panel">
      <Link to="/login" className="auth-brand">
        <span className="auth-brand-mark">
          <Sparkles size={21} />
        </span>
        <span>NEXCERA<span className="brand-period">.</span></span>
      </Link>

      <div className="auth-hero">
        <span className="auth-eyebrow">
          <span className="auth-live-dot" />
          INTELLIGENCE FOR YOUR NEXT MOVE
        </span>

        <h1>
          See the market
          <br />
          <span>with clarity.</span>
        </h1>

        <p>
          Your financial world, thoughtfully organized.
          Explore market movements, track your watchlist,
          and prepare for what comes next.
        </p>

        <div className="auth-preview-card">
          <div className="preview-card-top">
            <div>
              <span className="preview-label">MARKET OVERVIEW</span>
              <h3>Built for perspective.</h3>
            </div>
            <span className="preview-icon"><Sparkles size={17} /></span>
          </div>

          <div className="preview-chart" aria-hidden="true">
            <div className="preview-grid-line" />
            <div className="preview-grid-line" />
            <svg viewBox="0 0 420 105" preserveAspectRatio="none">
              <defs>
                <linearGradient id="preview-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#36d399" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#36d399" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 83 L35 71 L65 76 L100 48 L130 58 L170 35 L205 49 L245 24 L280 38 L320 17 L350 29 L385 9 L420 15 L420 105 L0 105 Z"
                fill="url(#preview-fill)"
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
            <span><span className="auth-live-dot" /> Illustrative market preview</span>
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
          <span className="auth-step-label">YOUR WORKSPACE AWAITS</span>
          <h2>Welcome back<span>.</span></h2>
          <p>Sign in to continue to your Nexcera workspace.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">Email address</label>
          <div className="auth-input-wrap">
            <Mail size={17} aria-hidden="true" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="auth-label-row">
            <label htmlFor="login-password">Password</label>
          </div>
          <div className="auth-input-wrap">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
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

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit">
            Sign in <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

        <div className="auth-security-note">
          <LockKeyhole size={14} />
          <span>Prototype mode · Authentication is not yet secured by a backend.</span>
        </div>
      </div>
    </section>
  </main>
)
}
