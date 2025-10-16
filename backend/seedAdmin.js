require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  const hashed = await bcrypt.hash('AdminPass123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed, role: 'admin' });
  console.log('Created admin:', admin.email);
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
