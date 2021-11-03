import jsonServer from 'json-server';
import { Database } from './db/database';
import { expressLogger, logger } from './util';
import { createE2eRouter } from './e2e/routes';

logger.info('Starting mocked backend server...');

const port = 9080;
const server = jsonServer.create();
const db = new Database();
const router = jsonServer.router(db.getPlainDatabase());

// Intentional delay of requests
/*server.use((req, res, next) => {
 setTimeout(next,1000);
 });*/

// General middleware
server.use(expressLogger);
server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults({ logger: false }));

// Routers and actual data
//server.use(router);
server.use('/api', router);
server.use('/e2e', createE2eRouter(router)); // Special utility routes used in e2e tests

server.listen(port, () => {
  logger.info(`Mocked backend is running on http://localhost:${port}.`);
});
