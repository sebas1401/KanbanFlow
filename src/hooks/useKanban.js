import { useState, useEffect } from 'react'

const STORAGE_KEY = 'kanban-data'

export function useKanban() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).projects || []
      } catch {
        return []
      }
    }
    return []
  })

  const [currentProjectId, setCurrentProjectId] = useState(null)

  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).columns || []
      } catch {
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ projects, columns })
    )
  }, [projects, columns])

  const createProject = (name) => {
    const id = Date.now().toString()
    setProjects([...projects, { id, name }])
  }

  const enterProject = (project) => {
    setCurrentProjectId(project.id)
    if (columns.length === 0) {
      setColumns([
        { id: 'todo', name: 'Pendiente', tasks: [] },
        { id: 'doing', name: 'En Proceso', tasks: [] },
        { id: 'done', name: 'Completado', tasks: [] },
      ])
    }
  }

  const goBack = () => {
    setCurrentProjectId(null)
  }

  const addColumn = (name) => {
    const id = Date.now().toString()
    setColumns([...columns, { id, name, tasks: [] }])
  }

  const addTask = (columnId, title) => {
    const id = Date.now().toString()
    const newTask = { id, title, description: '', assignees: [] }
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ))
  }

  const moveTask = ({ active, over }) => {
    if (!over) return

    const fromId = active.id
    const toColumnId = over.id

    setColumns((cols) => {
      let movedTask = null

      const newCols = cols.map((col) => {
        const filtered = col.tasks.filter((task) => {
          if (task.id === fromId) {
            movedTask = task
            return false
          }
          return true
        })
        return { ...col, tasks: filtered }
      })

      return newCols.map((col) => {
        if (col.id === toColumnId && movedTask) {
          return { ...col, tasks: [...col.tasks, movedTask] }
        }
        return col
      })
    })
  }

  return {
    projects,
    currentProjectId,
    createProject,
    enterProject,
    goBack,
    columns,
    addColumn,
    addTask,
    moveTask,
  }
}
