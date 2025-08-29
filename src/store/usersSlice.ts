// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '../../node_modules/@reduxjs/toolkit/dist/index'
import axios from '../../node_modules/axios/index'

type User = { id: number; name: string; email: string; username?: string; avatar?: string }

type UsersState = {
  loading: boolean
  users: User[]
}

const initialState: UsersState = { loading: false, users: [] }

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users')
  // map to lean user model
  return res.data.map((u: any) => ({ id: u.id, name: u.name, email: u.email }))
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, state => {
      state.loading = false
    })
  }
})

export default usersSlice.reducer
