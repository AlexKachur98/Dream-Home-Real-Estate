
import express from 'express';

import linksRouter from './links.js';

export default (/**@type {express.Express} */app) => {
  app
    .use('/api/test', linksRouter)
};
