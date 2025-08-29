import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { logout } from '../store/authSlice'
import { toggleTheme } from '../store/uiSlice'

export default function Header() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const dark = useSelector((s: RootState) => s.ui.dark)

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <h1 className="text-lg font-semibold">Task Manager</h1>
        <div className="flex-1" />
        <button onClick={() => dispatch(toggleTheme())} title="Toggle theme" className="p-2 rounded">
          {/* {dark ? <FaSun /> : <FaMoon />} */}
        </button>
        <div className="ml-3 flex items-center gap-3">
          <div className="text-sm">{user?.name || user?.email}</div>
          <button onClick={() => dispatch(logout())} className="px-3 py-1 border rounded">Logout</button>
        </div>
      </div>
    </header>
  )
}
