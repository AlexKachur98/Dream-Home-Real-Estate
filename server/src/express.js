
import express, { json, static as serveStatic } from 'express';
import cors from 'cors';
import { join } from 'path';
import apiMaster from './routes/api_master.js';

const app = express();
app
  .use(cors())
  .use(json());

apiMaster(app);

if (process.env.NODE_ENV === 'production') {
  const clientPath = join(process.cwd(), 'client/dist');
  app
    .use(serveStatic(clientPath))
    .get(/^(?!\/api).*/, (_, res) => {
      res.sendFile(join(clientPath, 'index.html'));
    });
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
