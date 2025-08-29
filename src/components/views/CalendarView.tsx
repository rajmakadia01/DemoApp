import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import { startOfWeek } from '../../../node_modules/date-fns/startOfWeek'
import { addDays } from '../../../node_modules/date-fns/addDays'
import { format } from '../../../node_modules/date-fns/format'

export default function CalendarView() {
  const tasks = useSelector((s: RootState) => s.tasks.tasks)
  const start = startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i))

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d => {
        const dayTasks = tasks.filter((t: { dueDate: string | number | Date }) => t.dueDate && new Date(t.dueDate).toDateString() === d.toDateString())
        return (
          <div key={d.toISOString()} className="p-2 border rounded h-40 overflow-auto bg-white dark:bg-gray-800">
            <div className="font-semibold">{format(d, 'EEE dd')}</div>
            <div className="mt-2 space-y-1">
              {dayTasks.map((t: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                <div key={t.id} className="p-1 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                  {t.title}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
