import { app } from '../app.js';
import { createConnection } from './database.js';

// Initialize the database connection
createConnection()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
  });
