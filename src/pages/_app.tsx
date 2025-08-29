import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { useEffect } from 'react'
import { fetchUsers } from '../store/usersSlice'
import { AppProps } from '../../node_modules/next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // load demo users into store
    store.dispatch(fetchUsers())
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
