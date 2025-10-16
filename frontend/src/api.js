const API_BASE = process.env.REACT_APP_API_BASE || 'https://mern-task-manager-api-3.onrender.com/api/v1';

async function request(path, { method='GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || 'Request failed'); // create Error object
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const auth = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  refresh: (payload) => request('/auth/refresh', { method: 'POST', body: payload })
};

export const tasks = {
  list: (token) => request('/tasks', { token }),
  create: (data, token) => request('/tasks', { method: 'POST', body: data, token }),
  update: (id, data, token) => request(`/tasks/${id}`, { method: 'PUT', body: data, token }),
  remove: (id, token) => request(`/tasks/${id}`, { method: 'DELETE', token })
};
