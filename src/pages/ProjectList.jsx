import { useState } from 'react'

export default function ProjectList({ projects, setProjects, onSelect }) {
  const [name, setName] = useState('')

  const addProject = () => {
    if (name.trim()) {
      setProjects([...projects, { id: crypto.randomUUID(), name }])
      setName('')
    }
  }

  return (
    <div>
      <h2>Proyectos</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nuevo proyecto" />
      <button onClick={addProject}>Crear</button>
      <ul>
        {projects.map(p => (
          <li key={p.id}>
            {p.name} <button onClick={() => onSelect(p)}>Entrar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}