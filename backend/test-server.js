const express = require('express');
const app = express();
const PORT = 3002;

app.get('/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});
