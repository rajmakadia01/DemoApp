import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import AuthPage from '../components/AuthPage'
import AppShell from '../components/AppShell'

export default function Home() {
  const user = useSelector((s: RootState) => s.auth.user)
  return user ? <AppShell /> : <AuthPage />
}
