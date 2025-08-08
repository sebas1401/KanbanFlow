import { DndContext } from '@dnd-kit/core'
import { useKanban } from '../hooks/useKanban'
import Column from '../components/Column'
import { Droppable } from '@dnd-kit/core' // no existe este componente, vamos a simularlo

export default function Board({ project, goBack }) {
  const { columns, moveTask, addColumn, addTask } = useKanban()

  return (
    <div>
      <h2>{project.name}</h2>
      <button onClick={goBack}>← Volver</button>
      <button onClick={() => addColumn(prompt('Nombre de columna'))}>+ Columna</button>

      <DndContext onDragEnd={moveTask}>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {columns.map(col => (
            <Column key={col.id} column={col} addTask={addTask} />
          ))}
        </div>
      </DndContext>
    </div>
  )
}
