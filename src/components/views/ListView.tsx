import { Priority, Attachment } from '@/store/tasksSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import TaskCard from '../TaskCard'

export default function ListView() {
  const tasks = useSelector((s: RootState) => s.tasks.tasks)

  return (
    <div>
      <div className="space-y-2">
        {tasks.map((t: { id: any; title?: string; description?: string | undefined; assigned?: number[]; priority?: Priority; dueDate?: string | undefined; status?: string; createdAt?: string; loggedSeconds?: number; timerRunningSince?: string | null | undefined; attachments?: Attachment[] | undefined }) => (
          <div key={t.id} className="bg-white dark:bg-gray-800 p-3 rounded">
            <TaskCard task={{
                    id: '',
                    title: '',
                    description: undefined,
                    assigned: [],
                    priority: 'Low',
                    dueDate: undefined,
                    status: '',
                    createdAt: '',
                    loggedSeconds: 0,
                    timerRunningSince: undefined,
                    attachments: undefined
                }}  />
          </div>
        ))}
      </div>
    </div>
  )
}
