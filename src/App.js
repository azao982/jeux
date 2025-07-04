import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("moyenne");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrUpdateTask = () => {
    if (task.trim() === "") return;
    const newTask = { text: task, done: false, priority, dueDate };
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = newTask;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTask("");
    setPriority("moyenne");
    setDueDate("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const editTask = (index) => {
    const t = tasks[index];
    setTask(t.text);
    setPriority(t.priority);
    setDueDate(t.dueDate);
    setEditingIndex(index);
  };

  const viewDetails = (task) => {
    alert(
      `📝 Tâche : ${task.text}\n📅 Date : ${
        task.dueDate || "Non définie"
      }\n🎯 Priorité : ${task.priority}`
    );
  };

  return (
    <div className="container">
      <h1 className="title">📝Liste des tacches</h1>

      <div className="form">
        <input
          type="text"
          value={task}
          placeholder="Ajouter une tâche..."
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="basse">🟢 Basse</option>
          <option value="moyenne">🟠 Moyenne</option>
          <option value="haute">🔴 Haute</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addOrUpdateTask}>
          {editingIndex !== null ? "💾 Modifier" : "➕ Ajouter"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i} className={`task ${t.done ? "done" : ""}`}>
            <div className="info" onClick={() => toggleTask(i)}>
              <span className="text">{t.text}</span>
              <div className="meta">
                <span className={`priority ${t.priority}`}>{t.priority}</span>
                {t.dueDate && <span className="date">📅 {t.dueDate}</span>}
              </div>
            </div>
            <div className="actions">
              <button onClick={() => viewDetails(t)}>🔍</button>
              <button onClick={() => editTask(i)}>✏️</button>
              <button onClick={() => deleteTask(i)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
