import 'reflect-metadata';
import { log, errorLog } from 'logger';
import { createAdmin, initializeDB } from 'db';
import { PORT } from './common/config';

(async () => {
  try {
    await initializeDB()
    await createAdmin()
  } catch (err) {
    errorLog('Failed to connect to DB!', err)
    return
  }

  const app = await import('./app')
  app.default.listen(PORT, () =>
    log(`App is running on http://localhost:${PORT}`)
  );
})()
