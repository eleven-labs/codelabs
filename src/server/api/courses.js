import Express from 'express';

const app = Express.router();

app.get('/courses', (req, res) => {
  res.json([
    { title: 'Créer une api avec API Platform', topics: ['tata', 'toto'] },
    { title: 'Les principaux formats de flux video live DASH et HLS', topics: ['tata', 'toto'] },
    { title: 'Take care of your emails', topics: ['tata', 'toto'] },
    { title: 'Envoyer des push notifications via Amazon SNS en SWIFT 3', topics: ['tata', 'toto'] },
    { title: 'Build a GO GraphQL API', topics: ['tata', 'toto'] },
    { title: 'Upload file with ajax', topics: ['tata', 'toto'] },
    { title: 'CQRS pattern', topics: ['tata', 'toto'] },
  ]);
});

export default app;
