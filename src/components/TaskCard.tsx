import { Task } from '../store/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { openTaskModal } from '../store/uiSlice'
import { startTimer, stopTimer } from '../store/tasksSlice'
import { formatDistanceToNow } from '../../node_modules/date-fns/formatDistanceToNow'

export default function TaskCard({ task }: { task: Task }) {
  const dispatch = useDispatch()

  const logged = (() => {
    const s = task.loggedSeconds || 0
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const secs = s % 60
    return `${h}h ${m}m ${secs}s`
  })()

  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{task.title}</div>
          <div className="text-xs text-gray-500">{task.description?.slice(0, 60)}</div>
        </div>
        <div className="text-xs">
          <button className="mr-2 text-blue-500" onClick={() => dispatch(openTaskModal(task.id))}>Open</button>
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center text-xs">
        <div>{task.priority}</div>
        <div>{task.dueDate ? `Due ${formatDistanceToNow(new Date(task.dueDate))}` : 'No due'}</div>
      </div>

      <div className="mt-2 flex gap-2">
        {!task.timerRunningSince ? (
          <button className="px-2 py-1 bg-green-500 text-white rounded text-xs" onClick={() => dispatch(startTimer(task.id))}>Start</button>
        ) : (
          <button className="px-2 py-1 bg-red-500 text-white rounded text-xs" onClick={() => dispatch(stopTimer(task.id))}>Stop</button>
        )}

        <div className="text-xs self-center">Tracked: {logged}</div>
      </div>
    </div>
  )
}
