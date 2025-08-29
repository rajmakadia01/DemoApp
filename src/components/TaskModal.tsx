import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { closeTaskModal } from '../store/uiSlice'
import { addTask, updateTask, addAttachment } from '../store/tasksSlice'
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react'


export default function TaskModal() {
  const dispatch = useDispatch()
  const open = useSelector((s: RootState) => s.ui.taskModalOpen)
  const editingId = useSelector((s: RootState) => s.ui.editingTaskId)
  const tasks = useSelector((s: RootState) => s.tasks.tasks)
  const users = useSelector((s: RootState) => s.users.users)
  const columns = useSelector((s: RootState) => s.tasks.columns)

  const editing = tasks.find((t: { id: any }) => t.id === editingId)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assigned, setAssigned] = useState<number[]>([])
  const [priority, setPriority] = useState<'Low'|'Normal'|'High'>('Normal')
  const [dueDate, setDueDate] = useState<string>('')

  useEffect(() => {
    if (editing) {
      setTitle(editing.title)
      setDescription(editing.description || '')
      setAssigned(editing.assigned || [])
      setPriority(editing.priority)
      setDueDate(editing.dueDate ? editing.dueDate.slice(0,10) : '')
    } else {
      setTitle('')
      setDescription('')
      setAssigned([])
      setPriority('Normal')
      setDueDate('')
    }
  }, [editingId, open])

  if (!open) return null

  function save() {
    if (!title) return alert('Title required')
    const payload = {
      title,
      description,
      assigned,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      status: editing ? editing.status : columns[0]
    }
    if (editing) {
      dispatch(updateTask({ id: editing.id, changes: payload }))
    } else {
      dispatch(addTask(payload))
    }
    dispatch(closeTaskModal())
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const attachment = { id: uuidv4(), name: file.name, dataUrl }
      if (editing) {
        // dispatch(addAttachment({ id: editing.id, file: attachment }))
      } else {
        // create a new task first
        const created = {
          title,
          description,
          assigned,
          priority,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
          status: columns[0],
          attachments: [attachment]
        }
        // dispatch(addTask(created))
        dispatch(closeTaskModal())
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{editing ? 'Edit Task' : 'Add Task'}</h3>
          <button onClick={() => dispatch(closeTaskModal())} className="text-sm">Close</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Title" className="p-2 border rounded bg-transparent" value={title} onChange={e => setTitle(e.target.value)} />
          <select className="p-2 border rounded bg-transparent" value={priority} onChange={e => setPriority(e.target.value as any)}>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>

          <textarea className="col-span-2 p-2 border rounded bg-transparent" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

          <div>
            <label className="block text-sm">Assign</label>
            <select multiple value={assigned.map(String)} className="w-full border rounded p-2 bg-transparent" onChange={e => {
              const opts = Array.from(e.target.selectedOptions).map(o => Number(o.value))
              setAssigned(opts)
            }}>
              {users.map((u: { id: Key | readonly string[] | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <option >{u.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm">Due date</label>
            <input type="date" className="p-2 border rounded bg-transparent w-full" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>

          <div className="col-span-2 flex gap-2 mt-3">
            <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            <label className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
              Attach file
              <input type="file" onChange={handleFile} className="hidden" />
            </label>
            <button onClick={() => dispatch(closeTaskModal())} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
function uuidv4() {
    throw new Error('Function not implemented.')
}

