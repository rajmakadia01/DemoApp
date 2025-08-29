import { createSlice, PayloadAction } from "../../node_modules/@reduxjs/toolkit/dist/index"

type AuthState = {
  user: { id: string; email: string; name?: string } | null
}

const saved = typeof window !== "undefined" ? localStorage.getItem("tm_auth") : null

const initialState: AuthState = {
  user: saved ? JSON.parse(saved) : null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state: { user: { id: string; email: any; name: any } }, action: PayloadAction<{ email: string; name?: string }>) {
      const u = { id: Date.now().toString(), email: action.payload.email, name: action.payload.name }
      state.user = u
      localStorage.setItem("tm_auth", JSON.stringify(u))
    },
    logout(state: { user: null }) {
      state.user = null
      localStorage.removeItem("tm_auth")
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
