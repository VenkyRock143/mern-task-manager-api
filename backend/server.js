const app = require('./app');
const connectDB = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
