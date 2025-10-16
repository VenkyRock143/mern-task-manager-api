import React, { useState, useEffect } from 'react';
import { auth, tasks } from './api';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [view, setView] = useState('login'); 
  const [error, setError] = useState('');
  const [tasksList, setTasksList] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [taskForm, setTaskForm] = useState({ title: '', description: '' });

  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  async function handleRegister(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await auth.register({ name: form.name, email: form.email, password: form.password });
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      setToken(res.accessToken); setUser(res.user); setView('dashboard');
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await auth.login({ email: form.email, password: form.password });
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      setToken(res.accessToken); setUser(res.user); setView('dashboard');
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    }
  }
  async function loadTasks() {
    try {
      const res = await tasks.list(token);
      setTasksList(res);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    }
  }
  async function handleCreateTask(e) {
    e.preventDefault();
    try {
      await tasks.create(taskForm, token);
      setTaskForm({ title: '', description: '' });
      loadTasks();
    } catch (err) { setError(err.message || 'Create failed'); }
  }
  async function handleLogout() {
    localStorage.removeItem('accessToken'); localStorage.removeItem('user');
    setToken(''); setUser(null); setView('login'); setTasksList([]);
  }

  if (view === 'register') {
    return (
      <div className="auth">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
          <button type="submit">Register</button>
        </form>
        <p>{error}</p>
        <p>Already have an account? <button onClick={()=>setView('login')}>Login</button></p>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="auth">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
          <button type="submit">Login</button>
        </form>
        <p>{error}</p>
        <p>No account? <button onClick={()=>setView('register')}>Register</button></p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h2>Dashboard</h2>
        <div>
          <strong>{user?.name}</strong> ({user?.role}) &nbsp;
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <section>
        <h3>Create Task</h3>
        <form onSubmit={handleCreateTask}>
          <input placeholder="Title" value={taskForm.title} onChange={e=>setTaskForm({...taskForm, title: e.target.value})} required />
          <input placeholder="Description" value={taskForm.description} onChange={e=>setTaskForm({...taskForm, description: e.target.value})} />
          <button type="submit">Create</button>
        </form>
        <p>{error}</p>
      </section>
      <section>
        <h3>Your Tasks</h3>
        <button onClick={loadTasks}>Refresh</button>
        <ul>
          {tasksList.map(t => (
            <li key={t._id}>
              <strong>{t.title}</strong> - {t.description} - {t.completed ? '✅' : '❌'}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
