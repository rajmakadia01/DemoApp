import { RootState } from './store'

import { createSlice, PayloadAction } from '../../node_modules/@reduxjs/toolkit/dist/index'
import { differenceInSeconds } from '../../node_modules/date-fns/differenceInSeconds'

export type Priority = 'Low' | 'Normal' | 'High'
export type Attachment = { id: string; name: string; dataUrl: string }

export type Task = {
  id: string
  title: string
  description?: string
  assigned: number[] // user ids from demo API
  priority: Priority
  dueDate?: string // ISO
  status: string
  createdAt: string
  loggedSeconds: number
  timerRunningSince?: string | null
  attachments?: Attachment[]
}

type TasksState = {
  columns: string[] // statuses
  tasks: Task[]
}

const saved = typeof window !== 'undefined' ? localStorage.getItem('tm_tasks') : null
const initialState: TasksState = saved
  ? JSON.parse(saved)
  : {
      columns: ['Open', 'In Progress', 'Completed'],
      tasks: [
        {
          id: 't1',
          title: 'Welcome task',
          description: 'This is a demo task. Edit, move or delete it.',
          assigned: [],
          priority: 'Normal',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          status: 'Open',
          createdAt: new Date().toISOString(),
          loggedSeconds: 0,
          timerRunningSince: null,
          attachments: []
        }
      ]
    }

const persist = (state: TasksState) => {
  localStorage.setItem('tm_tasks', JSON.stringify(state))
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addColumn(state, action: PayloadAction<string>) {
      state.columns.push(action.payload)
      persist(state)
    },
    addTask(state, action: PayloadAction<Partial<Task>>) {
      const t: Task = {
        id: Date.now().toString(),
        title: action.payload.title || 'Untitled',
        description: action.payload.description || '',
        assigned: action.payload.assigned || [],
        priority: (action.payload.priority as Priority) || 'Normal',
        dueDate: action.payload.dueDate || undefined,
        status: action.payload.status || state.columns[0],
        createdAt: new Date().toISOString(),
        loggedSeconds: action.payload.loggedSeconds || 0,
        timerRunningSince: action.payload.timerRunningSince || null,
        attachments: (action.payload.attachments as Attachment[]) || []
      }
      state.tasks.push(t)
      persist(state)
    },
    updateTask(state, action: PayloadAction<{ id: string; changes: Partial<Task> }>) {
      const idx = state.tasks.findIndex((t: { id: string }) => t.id === action.payload.id)
      if (idx !== -1) {
        state.tasks[idx] = { ...state.tasks[idx], ...action.payload.changes }
      }
      persist(state)
    },
    moveTask(state, action: PayloadAction<{ id: string; status: string; index?: number }>) {
      const idx = state.tasks.findIndex((t: { id: string }) => t.id === action.payload.id)
      if (idx === -1) return
      state.tasks[idx].status = action.payload.status
      // could reorder; keeping simple
      persist(state)
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t: { id: string }) => t.id !== action.payload)
      persist(state)
    },
    startTimer(state, action: PayloadAction<string>) {
      const t = state.tasks.find((x: { id: string }) => x.id === action.payload)
      if (t && !t.timerRunningSince) {
        t.timerRunningSince = new Date().toISOString()
      }
      persist(state)
    },
    stopTimer(state, action: PayloadAction<string>) {
      const t = state.tasks.find((x: { id: string }) => x.id === action.payload)
      if (t && t.timerRunningSince) {
        const started = new Date(t.timerRunningSince)
        const secs = differenceInSeconds(new Date(), started)
        t.loggedSeconds = (t.loggedSeconds || 0) + secs
        t.timerRunningSince = null
      }
      persist(state)
    },
    addAttachment(state, action: PayloadAction<{ id: string; file: Attachment }>) {
      const t = state.tasks.find((x: { id: string }) => x.id === action.payload.id)
      if (t) {
        t.attachments = t.attachments || []
        t.attachments.push(action.payload.file)
      }
      persist(state)
    }
  }
})

export const {
  addColumn,
  addTask,
  updateTask,
  moveTask,
  deleteTask,
  startTimer,
  stopTimer,
  addAttachment
} = tasksSlice.actions
export default tasksSlice.reducer

// selectors
export const selectTasksByStatus = (state: RootState, status: string) =>
  state.tasks.tasks.filter((t: { status: string }) => t.status === status)
