import React, { useState } from 'react';

function Task({ task, onToggleComplete, onDelete }) {
  return (
    <li>
      <input type="checkbox" checked={task.completed} onChange={() => onToggleComplete(task.id)} />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

function TaskList({ tasks, onToggleComplete, onDelete }) {
  return (
    <ul>
      {tasks.map(task => (
        <Task key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} />
    </div>
  );
}

export default App;