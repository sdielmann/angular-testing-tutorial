import { Router } from 'express';
import { JsonServerRouter } from 'json-server';
import { logger } from '../util';
import e2eData from './data/e2e.main.json';

export const createE2eRouter = (baseRouter: JsonServerRouter<any>) => {
  const router = Router();

  router.post('/reset', async (req, res) => {
    // Make sure we have an immutable copy of the e2e data; spread operator does not work for some reason
    const data = JSON.parse(JSON.stringify(e2eData));
    baseRouter.db.setState(data);
    logger.debug('DB was reset to e2e test data!');
    return res.sendStatus(204);
  });

  return router;
};

