import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../src/components/auth/ProtectedRoute'

function renderProtectedRoute(initialEntry = '/dashboard') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<h1>Login page</h1>} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<h1>Protected dashboard</h1>}
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('redirects unauthenticated users to login', () => {
    renderProtectedRoute()

    expect(
      screen.getByRole('heading', { name: 'Login page' }),
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: 'Protected dashboard' }),
    ).not.toBeInTheDocument()
  })

  it('allows access when a session exists', () => {
    localStorage.setItem(
      'nexcera-session',
      JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
      }),
    )

    renderProtectedRoute()

    expect(
      screen.getByRole('heading', { name: 'Protected dashboard' }),
    ).toBeInTheDocument()
  })

  it('redirects when the session contains malformed JSON', () => {
    localStorage.setItem('nexcera-session', '{invalid-json')

    renderProtectedRoute()

    expect(
      screen.getByRole('heading', { name: 'Login page' }),
    ).toBeInTheDocument()

    expect(localStorage.getItem('nexcera-session')).toBeNull()
  })

  it('redirects when the session is an empty object', () => {
    localStorage.setItem('nexcera-session', JSON.stringify({}))

    renderProtectedRoute()

    expect(
      screen.getByRole('heading', { name: 'Login page' }),
    ).toBeInTheDocument()
  })
})
