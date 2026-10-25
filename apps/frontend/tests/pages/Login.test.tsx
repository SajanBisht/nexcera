import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '../../src/pages/Login'

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<h1>Dashboard reached</h1>}
        />
        <Route path="/signup" element={<h1>Signup page</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

const existingUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
}

describe('Login page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('renders the login form', () => {
    renderLogin()

    expect(
      screen.getByRole('heading', { name: /welcome back/i }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeVisible()
  })

  it('rejects an empty form', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please enter your email and password.',
    )
    expect(localStorage.getItem('nexcera-session')).toBeNull()
  })

  it('rejects an invalid email address', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByLabelText(/email address/i), 'invalid-email')
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please enter a valid email address.',
    )
    expect(localStorage.getItem('nexcera-session')).toBeNull()
  })

  it('rejects login when no account exists', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.type(
      screen.getByLabelText(/email address/i),
      'unknown@example.com',
    )
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'No account found. Please create an account first.',
    )
    expect(localStorage.getItem('nexcera-session')).toBeNull()
  })

  it('rejects an incorrect password', async () => {
    localStorage.setItem('nexcera-user', JSON.stringify(existingUser))

    const user = userEvent.setup()
    renderLogin()

    await user.type(
      screen.getByLabelText(/email address/i),
      existingUser.email,
    )
    await user.type(screen.getByLabelText(/^password$/i), 'wrong-password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Invalid email or password.',
    )
    expect(localStorage.getItem('nexcera-session')).toBeNull()
  })

  it('allows case-insensitive email matching', async () => {
    localStorage.setItem('nexcera-user', JSON.stringify(existingUser))

    const user = userEvent.setup()
    renderLogin()

    await user.type(
      screen.getByLabelText(/email address/i),
      'TEST@EXAMPLE.COM',
    )
    await user.type(
      screen.getByLabelText(/^password$/i),
      existingUser.password,
    )
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(
      await screen.findByRole('heading', { name: 'Dashboard reached' }),
    ).toBeInTheDocument()

    expect(JSON.parse(localStorage.getItem('nexcera-session')!)).toEqual({
      email: existingUser.email,
      name: existingUser.name,
    })
  })

  it('allows a user to show and hide their password', async () => {
    const user = userEvent.setup()
    renderLogin()

    const passwordInput = screen.getByLabelText(/^password$/i)

    expect(passwordInput).toHaveAttribute('type', 'password')

    await user.click(screen.getByRole('button', { name: /show password/i }))
    expect(passwordInput).toHaveAttribute('type', 'text')

    await user.click(screen.getByRole('button', { name: /hide password/i }))
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('navigates to signup from the create-account link', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.click(screen.getByRole('link', { name: /create one/i }))

    expect(
      await screen.findByRole('heading', { name: /signup page/i }),
    ).toBeInTheDocument()
  })
})
