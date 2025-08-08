import React from 'react'
import { useKanban } from './hooks/useKanban'
import Column from './components/Column'
import logoImg from './imagenes/1.png'  // <-- Importar la imagen

export default function App() {
  const {
    projects,
    createProject,
    enterProject,
    goBack,
    currentProjectId,
    columns,
    addColumn,
    addTask,
    moveTask
  } = useKanban()

  const handleCreateProject = () => {
    const name = prompt('Nombre del proyecto:')
    if (name) createProject(name)
  }

  const handleAddColumn = () => {
    const name = prompt('Nombre de la columna:')
    if (name) addColumn(name)
  }

  if (!currentProjectId) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: 'center' }}>
        <img src={logoImg} alt="Kanban Logo" style={{ width: 80, marginBottom: 20 }} />
        <h1 style={{ color: '#fff' }}>Mis Proyectos</h1>
        <button
          onClick={handleCreateProject}
          style={{
            display: 'inline-block',
            margin: '20px auto',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 28px',
            borderRadius: 30,
            cursor: 'pointer',
            fontWeight: '700',
            boxShadow: '0 5px 15px rgba(0,123,255,0.6)'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          + Nuevo Proyecto
        </button>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 30 }}>
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="project-item"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                marginBottom: 18,
                padding: 14,
                borderRadius: 15,
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#fff',
                cursor: 'pointer',
                userSelect: 'none',
                animationDelay: `${i * 0.1}s`
              }}
            >
              <span>{p.name}</span>
              <button
                onClick={() => enterProject(p)}
                style={{
                  backgroundColor: '#28a745',
                  border: 'none',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: 20,
                  cursor: 'pointer',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(40,167,69,0.6)',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1e7e34')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#28a745')}
              >
                Entrar
              </button>
            </li>
          ))}
          {projects.length === 0 && (
            <p style={{ color: '#eee', marginTop: 40, fontStyle: 'italic' }}>No hay proyectos. Crea uno para empezar.</p>
          )}
        </ul>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <button
          onClick={goBack}
          style={{
            backgroundColor: '#6c757d',
            border: 'none',
            color: 'white',
            padding: '10px 22px',
            borderRadius: 30,
            cursor: 'pointer',
            fontWeight: '700',
            boxShadow: '0 5px 15px rgba(108,117,125,0.7)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#565e64')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#6c757d')}
        >
          ← Volver
        </button>
        <button
          onClick={handleAddColumn}
          style={{
            backgroundColor: '#17a2b8',
            border: 'none',
            color: 'white',
            padding: '10px 24px',
            borderRadius: 30,
            cursor: 'pointer',
            fontWeight: '700',
            boxShadow: '0 5px 15px rgba(23,162,184,0.7)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#117a8b')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#17a2b8')}
        >
          + Columna
        </button>
      </div>

      <div style={{ display: 'flex', gap: 28, overflowX: 'auto', paddingBottom: 30 }}>
        {columns.map(col => (
          <Column
            key={col.id}
            column={col}
            addTask={addTask}
            moveTask={moveTask}
          />
        ))}
      </div>
    </div>
  )
}
