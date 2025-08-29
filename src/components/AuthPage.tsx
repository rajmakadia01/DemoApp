import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'

export default function AuthPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return alert('Enter email')
    dispatch(login({ email, name }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Task Manager — Sign in</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            className="w-full p-2 border rounded bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
            <small className="text-xs text-gray-500">Demo auth — client-side only</small>
          </div>
        </form>
      </div>
    </div>
  )
}
