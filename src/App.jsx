import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // 讀取存檔 (useEffect 實作)
  useEffect(() => {
    const saved = localStorage.getItem('hw6_storage');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // 自動存檔 (useEffect 實作)
  useEffect(() => {
    localStorage.setItem('hw6_storage', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  return (
    <div className="app-container">
      <h1>React 學習筆記 (2)</h1>
      <p className="user-info">資工三甲 - 劉恆睿</p>
      
      <div className="concept-box">
        <h4>學習重點：Hook, useState, useEffect</h4>
      </div>

      <form onSubmit={handleAdd} className="input-group">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="新增任務..." />
        <button type="submit">加入</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <span>{todo.text}</span>
            <button onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App