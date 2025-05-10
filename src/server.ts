import app from './app.js';
import database from './config/database.js';

const PORT = process.env.PORT || 5000;

async function start() {
  try {
     await database.authenticate();
     console.log('Database connected ✅');

    // await sequelize.sync({ alter: true }); // Or use { force: true } in dev
    await database.sync({force: true});

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

start();
