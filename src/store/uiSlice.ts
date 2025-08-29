import { createSlice, PayloadAction } from "../../node_modules/@reduxjs/toolkit/dist/index"

type UIState = {
  dark: boolean
  view: 'board' | 'list' | 'calendar'
  taskModalOpen: boolean
  editingTaskId: string | null
}

const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('tm_theme') : null
const initialState: UIState = {
  dark: savedTheme === 'dark',
  view: 'board',
  taskModalOpen: false,
  editingTaskId: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.dark = !state.dark
      localStorage.setItem('tm_theme', state.dark ? 'dark' : 'light')
    },
    setView(state, action: PayloadAction<UIState['view']>) {
      state.view = action.payload
    },
    openTaskModal(state, action: PayloadAction<string | null>) {
      state.taskModalOpen = true
      state.editingTaskId = action.payload
    },
    closeTaskModal(state) {
      state.taskModalOpen = false
      state.editingTaskId = null
    }
  }
})

export const { toggleTheme, setView, openTaskModal, closeTaskModal } = uiSlice.actions
export default uiSlice.reducer
