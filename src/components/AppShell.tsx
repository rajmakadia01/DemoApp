import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { logout } from '../store/authSlice'
import { toggleTheme, setView, openTaskModal } from '../store/uiSlice'
import BoardView from './views/BoardView'
import ListView from './views/ListView'
import CalendarView from './views/CalendarView'
import TaskModal from './TaskModal'
import Header from './Header'

export default function AppShell() {
  const dispatch = useDispatch()
  const ui = useSelector((s: RootState) => s.ui)
  const theme = ui.dark ? 'dark' : ''

  return (
    <div className={`${theme} min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <Header />
      <div className="p-4">
        <div className="flex gap-2 items-center mb-4">
          <button onClick={() => dispatch(setView('board'))} className="btn">Board</button>
          <button onClick={() => dispatch(setView('list'))} className="btn">List</button>
          <button onClick={() => dispatch(setView('calendar'))} className="btn">Calendar</button>
          <div className="flex-1" />
          <button onClick={() => dispatch(openTaskModal(null))} className="px-4 py-2 bg-green-600 text-white rounded">Add Task</button>
        </div>

        <div>
          {ui.view === 'board' && <BoardView />}
          {ui.view === 'list' && <ListView />}
          {ui.view === 'calendar' && <CalendarView />}
        </div>
      </div>

      <TaskModal />
    </div>
  )
}
