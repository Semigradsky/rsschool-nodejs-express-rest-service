import { log } from 'logger';
import { PORT } from './common/config';
import app from './app';

app.listen(PORT, () =>
  log(`App is running on http://localhost:${PORT}`)
);
