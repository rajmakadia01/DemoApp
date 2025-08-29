import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Attachment, moveTask, Priority, selectTasksByStatus } from '../../store/tasksSlice'
import TaskCard from '../TaskCard'
import { openTaskModal } from '../../store/uiSlice'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, ClassAttributes, HTMLAttributes, JSX, Ref } from 'react'

export default function BoardView() {
  const dispatch = useDispatch()
  const columns = useSelector((s: RootState) => s.tasks.columns)
  const tasks = useSelector((s: RootState) => s.tasks.tasks)

  function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const taskId = result.draggableId
    const destCol = result.destination.droppableId
    dispatch(moveTask({ id: taskId, status: destCol }))
  }
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
          <Droppable droppableId={col} key={col}>
            {(provided: { innerRef: Ref<HTMLDivElement> | undefined; droppableProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; placeholder: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white dark:bg-gray-800 p-3 rounded min-h-[200px]"
              >
                <div className="font-semibold mb-2 flex justify-between">
                  <span>{col}</span>
                  <button onClick={() => dispatch(openTaskModal(null))} className="text-sm text-blue-500">+ Add</button>
                </div>

                {tasks.filter((t: { status: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | ReactPortal | Iterable<ReactNode> | null | undefined> | null | undefined }) => t.status === col).map((task: { id: any; title?: string; description?: string | undefined; assigned?: number[]; priority?: Priority; dueDate?: string | undefined; status?: string; createdAt?: string; loggedSeconds?: number; timerRunningSince?: string | null | undefined; attachments?: Attachment[] | undefined }, idx: any) => (
                  <Draggable draggableId={task.id} index={idx} key={task.id}>
                    {(prov: { innerRef: Ref<HTMLDivElement> | undefined; draggableProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>; dragHandleProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> }) => (
                      <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="mb-2">
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
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}
