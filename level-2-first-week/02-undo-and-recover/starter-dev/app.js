const express = require('express');
const app = express();
app.use(express.json());

// In-memory store
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol', email: 'carol@example.com', role: 'user' },
];

// Auth middleware — simple token check
function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || token !== 'Bearer valid-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Routes
app.get('/api/users', authenticate, (req, res) => {
  res.json(users.map(u => ({ id: u.id, name: u.name, role: u.role })));
});

app.get('/api/users/:id', authenticate, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', authenticate, (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'user'
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete('/api/users/:id', authenticate, (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json({ message: `Deleted ${deleted[0].name}` });
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('API running on http://localhost:3000'));
}
