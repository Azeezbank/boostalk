import app from './app.js';

import database from './config/database.js';

import '../src/models/user.model.js';
import '../src/models/Post.model.js';
import '../src/models/association.js';

console.log('DB_HOST:', process.env.DB_HOST);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
     await database.authenticate();
     console.log('Database connected ✅');

    // await sequelize.sync({ alter: true }); // Or use { force: true } in dev
    await database.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

start();