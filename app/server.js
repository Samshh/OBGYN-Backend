const express = require('express');
const app = express();
const routes = require('./routes');

// ...existing code...

// Use the routes
app.use(routes);

// ...existing code...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
