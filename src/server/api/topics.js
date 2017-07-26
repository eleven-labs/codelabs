import Express from 'express';

const app = Express.router();

app.get('/topics', (req, res) => {
  res.json([
    { title: 'Eleven Labs' },
    { title: 'CodeLabs' },
    { title: 'React' },
    { title: 'Redux' },
    { title: 'GraphQL' },
    { title: 'Elastic Search' },
    { title: 'Symfony' },
  ]);
});

export default app;
