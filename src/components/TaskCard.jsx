import { useDraggable } from '@dnd-kit/core'

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task }
  })

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    border: '1px solid gray',
    padding: '0.5rem',
    marginTop: '0.5rem',
    background: 'white'
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {task.title}
    </div>
  )
}