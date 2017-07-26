import Express from 'express';
import topics from './topics';

const app = Express.router();

app.use('api', [
  topics,
  courses,
]);

export default app;
