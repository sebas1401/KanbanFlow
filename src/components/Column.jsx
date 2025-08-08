import React, { useState } from 'react'

export default function Column({ column, addTask, moveTask }) {
  const [draggingTaskId, setDraggingTaskId] = useState(null)

  const handleAddTask = () => {
    const title = prompt('Título de la tarea:')
    if (title) addTask(column.id, title)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('task-id')
    moveTask({ active: { id: taskId }, over: { id: column.id } })
    setDraggingTaskId(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('task-id', id)
    setDraggingTaskId(id)
  }

  const handleDragEnd = () => {
    setDraggingTaskId(null)
  }

  return (
    <div
      className="column"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        minWidth: '280px',
        borderRadius: 20,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        cursor: 'default',
        userSelect: 'none',
        position: 'relative',
        backgroundImage: 'url(/images/background-decor.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom right',
        backgroundSize: '80px'
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
      onDragLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <h2 style={{ fontSize: 22, marginBottom: 18, color: '#222' }}>{column.name}</h2>
      <button
        onClick={handleAddTask}
        style={{
          backgroundColor: '#ffc107',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 30,
          cursor: 'pointer',
          fontWeight: '700',
          color: '#444',
          boxShadow: '0 6px 15px rgba(255,193,7,0.5)',
          transition: 'background-color 0.3s ease',
          marginBottom: 22,
          width: '100%'
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e0a800')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ffc107')}
      >
        + Nueva tarea
      </button>
      <div>
        {column.tasks.length === 0 && (
          <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
            No hay tareas. Agrega una :)
          </p>
        )}
        {column.tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={e => handleDragStart(e, task.id)}
            onDragEnd={handleDragEnd}
            className={`task-card ${draggingTaskId === task.id ? 'dragging' : ''}`}
            style={{
              marginBottom: 16,
              padding: '14px',
              backgroundColor: '#fff',
              borderRadius: 18,
              boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
              cursor: 'grab',
              fontWeight: '600',
              color: '#222',
              userSelect: 'none'
            }}
          >
            {task.title}
          </div>
        ))}
      </div>
    </div>
  )
}
