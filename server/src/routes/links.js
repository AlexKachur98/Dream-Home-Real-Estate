
import { Router } from 'express';

export default Router().get('/', (_, res) => {
  res.json(
    [
      { id: 1, url: 'https://example.ca' }
    ]
  );
});
