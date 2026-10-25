import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Signup from '../../src/pages/Signup'

function renderSignup() {
  return render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<h1>Dashboard reached</h1>}
        />
        <Route path="/login" element={<h1>Login page</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Signup page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('renders all required fields', () => {
    renderSignup()

    expect(
      screen.getByRole('heading', { name: /create account/i }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/confirm password/i),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeVisible()
  })

  it('rejects an empty form', async () => {
    const user = userEvent.setup()
    renderSignup()

    await user.click(
      screen.getByRole('button', { name: /create account/i }),
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please complete all fields.',
    )
    expect(localStorage.getItem('nexcera-user')).toBeNull()
    expect(localStorage.getItem('nexcera-session')).toBeNull()
  })

  it('rejects an invalid email address', async () => {
    const user = userEvent.setup()
    renderSignup()

    await user.type(screen.getByLabelText(/full name/i), 'Test User')
    await user.type(screen.getByLabelText(/email address/i), 'invalid-email')
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'password123',
    )

    await user.click(
      screen.getByRole('button', { name: /create account/i }),
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please enter a valid email address.',
    )
    expect(localStorage.getItem('nexcera-user')).toBeNull()
  })

  it('rejects passwords shorter than eight characters', async () => {
    const user = userEvent.setup()
    renderSignup()

    await user.type(screen.getByLabelText(/full name/i), 'Test User')
    await user.type(
      screen.getByLabelText(/email address/i),
      'test@example.com',
    )
    await user.type(screen.getByLabelText(/^password$/i), 'short')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'short',
    )

    await user.click(
      screen.getByRole('button', { name: /create account/i }),
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Your password must contain at least 8 characters.',
    )
    expect(localStorage.getItem('nexcera-user')).toBeNull()
  })

  it('rejects passwords that do not match', async () => {
    const user = userEvent.setup()
    renderSignup()

    await user.type(screen.getByLabelText(/full name/i), 'Test User')
    await user.type(
      screen.getByLabelText(/email address/i),
      'test@example.com',
    )
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'different123',
    )

    await user.click(
      screen.getByRole('button', { name: /create account/i }),
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Your passwords do not match.',
    )
    expect(localStorage.getItem('nexcera-user')).toBeNull()
  })

  it('creates an account and navigates to the dashboard', async () => {
    const user = userEvent.setup()
    renderSignup()

    await user.type(screen.getByLabelText(/full name/i), 'Test User')
    await user.type(
      screen.getByLabelText(/email address/i),
      'test@example.com',
    )
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'password123',
    )

    await user.click(
      screen.getByRole('button', { name: /create account/i }),
    )

    expect(
      await screen.findByRole('heading', { name: 'Dashboard reached' }),
    ).toBeInTheDocument()

    const savedUser = JSON.parse(
      localStorage.getItem('nexcera-user')!,
    )

    expect(savedUser).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    })

    const session = JSON.parse(
      localStorage.getItem('nexcera-session')!,
    )

    expect(session).toEqual({
      name: 'Test User',
      email: 'test@example.com',
    })
  })

  it('rejects an existing email address', async () => {
    localStorage.setItem(
      'nexcera-user',
      JSON.stringify({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'existing123',
      }),
    )

    const user = userEvent.setup()
    renderSignup()

    await user.type(screen.getByLabelText(/full name/i), 'Another User')
    await user.type(
      screen.getByLabelText(/email address/i),
      'EXISTING@example.com',
    )
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'password123',
    )

    await user.click(
      screen.getByRole('button', { name: /create account/i }),
    )

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'An account with this email already exists. Please sign in.',
      )
    })

    expect(
      JSON.parse(localStorage.getItem('nexcera-user')!).email,
    ).toBe('existing@example.com')

    expect(localStorage.getItem('nexcera-session')).toBeNull()
  })
})
